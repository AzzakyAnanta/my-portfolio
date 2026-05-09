"""
╔══════════════════════════════════════════════════════════════════╗
║        AZZAM HAND-TRACKING NAVIGATOR                            ║
║        Kontrol Website dengan Gerakan Tangan                    ║
║        By: Azzam Ananta — Pradita University                    ║
╠══════════════════════════════════════════════════════════════════╣
║  REQUIREMENTS:                                                  ║
║    pip install opencv-python mediapipe websockets asyncio       ║
║                                                                 ║
║  CARA PAKAI:                                                    ║
║    1. Jalankan script ini: python hand_tracking.py             ║
║    2. Buka portfolio di browser                                 ║
║    3. Swipe tangan ke KIRI → slide berikutnya                  ║
║    4. Swipe tangan ke KANAN → slide sebelumnya                 ║
║    5. Tekan 'Q' untuk keluar                                    ║
╚══════════════════════════════════════════════════════════════════╝
"""

import cv2
import mediapipe as mp
import asyncio
import websockets
import json
import threading
import time
from collections import deque

# ─── CONFIG ──────────────────────────────────────────────────────
WS_HOST = "localhost"
WS_PORT = 8765
SWIPE_THRESHOLD = 0.18        # Minimal jarak swipe (normalized 0-1)
SWIPE_COOLDOWN = 0.9          # Detik antar gesture
HISTORY_LEN = 12              # Frame history untuk deteksi swipe
MIN_DETECTION_CONFIDENCE = 0.75
MIN_TRACKING_CONFIDENCE = 0.6
# ─────────────────────────────────────────────────────────────────

# MediaPipe setup
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# WebSocket clients
connected_clients = set()

# State
last_gesture_time = 0
x_history = deque(maxlen=HISTORY_LEN)


async def ws_handler(websocket, path=None):
    """Handle WebSocket connections from browser."""
    connected_clients.add(websocket)
    print(f"🌐 Browser terhubung! Total clients: {len(connected_clients)}")
    try:
        async for msg in websocket:
            pass  # We only send, not receive
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        connected_clients.discard(websocket)
        print(f"🔌 Browser terputus. Total clients: {len(connected_clients)}")


async def broadcast(gesture: str):
    """Send gesture to all connected browsers."""
    if connected_clients:
        message = json.dumps({"gesture": gesture, "timestamp": time.time()})
        await asyncio.gather(
            *[client.send(message) for client in connected_clients],
            return_exceptions=True
        )
        print(f"📡 Gesture terkirim: {gesture}")


def detect_swipe(x_history: deque) -> str | None:
    """
    Deteksi swipe dari riwayat posisi X telapak tangan.
    Returns: 'swipe_right', 'swipe_left', atau None
    """
    if len(x_history) < HISTORY_LEN // 2:
        return None

    start_x = x_history[0]
    end_x = x_history[-1]
    delta = end_x - start_x

    # Cek konsistensi arah (tidak bolak-balik)
    mid = len(x_history) // 2
    first_half_delta = x_history[mid] - x_history[0]
    second_half_delta = x_history[-1] - x_history[mid]

    # Arah harus konsisten
    if first_half_delta * second_half_delta < 0:
        return None

    if delta > SWIPE_THRESHOLD:
        return "swipe_right"   # Tangan bergerak kanan → slide sebelumnya
    elif delta < -SWIPE_THRESHOLD:
        return "swipe_left"    # Tangan bergerak kiri → slide berikutnya

    return None


def draw_ui(frame, hand_landmarks, gesture_detected=None, connected=False):
    """Draw custom UI overlay on camera frame."""
    h, w = frame.shape[:2]

    # Dark overlay panel top
    overlay = frame.copy()
    cv2.rectangle(overlay, (0, 0), (w, 70), (10, 15, 20), -1)
    cv2.addWeighted(overlay, 0.8, frame, 0.2, 0, frame)

    # Title
    cv2.putText(frame, "AZZAM HAND-TRACKING NAVIGATOR",
                (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 200, 150), 2)

    # Connection status
    status_color = (0, 200, 100) if connected else (100, 100, 100)
    status_text = f"CONNECTED ({len(connected_clients)} browser)" if connected else "WAITING FOR BROWSER..."
    cv2.putText(frame, status_text,
                (20, 55), cv2.FONT_HERSHEY_SIMPLEX, 0.42, status_color, 1)

    # Instructions bottom
    overlay2 = frame.copy()
    cv2.rectangle(overlay2, (0, h - 80), (w, h), (10, 15, 20), -1)
    cv2.addWeighted(overlay2, 0.85, frame, 0.15, 0, frame)

    instructions = [
        ("< Swipe KIRI", "Slide Berikutnya"),
        ("Swipe KANAN >", "Slide Sebelumnya"),
        ("Q", "Keluar"),
    ]
    for i, (key, val) in enumerate(instructions):
        x = 20 + i * (w // 3)
        cv2.putText(frame, key, (x, h - 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 200, 150), 1)
        cv2.putText(frame, val, (x, h - 28),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.38, (150, 180, 200), 1)

    # Gesture flash
    if gesture_detected:
        color = (0, 150, 255) if "right" in gesture_detected else (0, 200, 150)
        arrow = ">>> NEXT >>>" if "left" in gesture_detected else "<<< PREV <<<"
        text_size = cv2.getTextSize(arrow, cv2.FONT_HERSHEY_DUPLEX, 2.0, 3)[0]
        tx = (w - text_size[0]) // 2
        ty = h // 2 + text_size[1] // 2
        # Glow effect (multiple layers)
        for thickness, alpha_color in [(8, (color[0]//3, color[1]//3, color[2]//3)),
                                        (5, (color[0]//2, color[1]//2, color[2]//2)),
                                        (3, color)]:
            cv2.putText(frame, arrow, (tx, ty),
                        cv2.FONT_HERSHEY_DUPLEX, 2.0, alpha_color, thickness)

    # Draw hand landmarks with custom style
    if hand_landmarks:
        mp_drawing.draw_landmarks(
            frame,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
            mp_drawing_styles.get_default_hand_landmarks_style(),
            mp_drawing_styles.get_default_hand_connections_style()
        )

        # Draw wrist point (reference)
        wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]
        cx, cy = int(wrist.x * w), int(wrist.y * h)
        cv2.circle(frame, (cx, cy), 12, (0, 200, 150), -1)
        cv2.circle(frame, (cx, cy), 16, (0, 200, 150), 2)

    return frame


def run_camera(loop):
    """Run OpenCV camera loop in a separate thread."""
    global last_gesture_time

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_FPS, 30)

    print("📷 Kamera berhasil dibuka!")
    print("✋ Mulai deteksi tangan...")
    print("─" * 50)

    gesture_display_time = 0
    last_gesture_display = None

    with mp_hands.Hands(
        model_complexity=1,
        min_detection_confidence=MIN_DETECTION_CONFIDENCE,
        min_tracking_confidence=MIN_TRACKING_CONFIDENCE,
        max_num_hands=1
    ) as hands:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("❌ Gagal membaca frame kamera!")
                break

            # Flip for mirror effect
            frame = cv2.flip(frame, 1)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            rgb.flags.writeable = False
            results = hands.process(rgb)
            rgb.flags.writeable = True

            detected_landmarks = None
            gesture_this_frame = None

            if results.multi_hand_landmarks:
                hand_lm = results.multi_hand_landmarks[0]
                detected_landmarks = hand_lm

                # Get wrist X position (normalized 0-1)
                wrist_x = hand_lm.landmark[mp_hands.HandLandmark.WRIST].x
                x_history.append(wrist_x)

                # Check for swipe
                now = time.time()
                if now - last_gesture_time > SWIPE_COOLDOWN:
                    gesture = detect_swipe(x_history)
                    if gesture:
                        last_gesture_time = now
                        last_gesture_display = gesture
                        gesture_display_time = now
                        x_history.clear()
                        print(f"✋ Gesture: {gesture.upper().replace('_', ' ')}")
                        # Send via WebSocket (thread-safe)
                        asyncio.run_coroutine_threadsafe(
                            broadcast(gesture), loop
                        )
            else:
                # No hand → clear history gradually
                if len(x_history) > 0:
                    x_history.popleft()

            # Show gesture for 0.5s
            show_gesture = None
            if last_gesture_display and time.time() - gesture_display_time < 0.5:
                show_gesture = last_gesture_display

            # Draw UI
            is_connected = len(connected_clients) > 0
            frame = draw_ui(frame, detected_landmarks, show_gesture, is_connected)

            # Swipe progress bar
            if len(x_history) > 2:
                h_frame, w_frame = frame.shape[:2]
                delta = x_history[-1] - x_history[0]
                progress = min(abs(delta) / SWIPE_THRESHOLD, 1.0)
                bar_w = int(progress * 200)
                bar_color = (0, 200, 150) if delta < 0 else (0, 150, 255)
                cv2.rectangle(frame, (w_frame//2 - 100, h_frame//2 + 60),
                              (w_frame//2 - 100 + bar_w, h_frame//2 + 75),
                              bar_color, -1)
                cv2.rectangle(frame, (w_frame//2 - 100, h_frame//2 + 60),
                              (w_frame//2 + 100, h_frame//2 + 75),
                              (40, 60, 80), 2)

            cv2.imshow('Azzam Hand-Tracking Navigator', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                print("\n👋 Keluar dari Hand-Tracking Navigator. Sampai jumpa!")
                break

    cap.release()
    cv2.destroyAllWindows()


async def main():
    print("╔══════════════════════════════════════════╗")
    print("║   AZZAM HAND-TRACKING NAVIGATOR v1.0    ║")
    print("╠══════════════════════════════════════════╣")
    print(f"║  WebSocket Server: ws://{WS_HOST}:{WS_PORT}      ║")
    print("║  Buka portfolio di browser lalu mulai!  ║")
    print("╚══════════════════════════════════════════╝\n")

    # Start WebSocket server
    loop = asyncio.get_event_loop()
    server = await websockets.serve(ws_handler, WS_HOST, WS_PORT)
    print(f"✅ WebSocket Server aktif di ws://{WS_HOST}:{WS_PORT}")

    # Run camera in thread
    cam_thread = threading.Thread(target=run_camera, args=(loop,), daemon=True)
    cam_thread.start()

    print("📷 Membuka kamera...")
    await asyncio.get_event_loop().run_in_executor(None, cam_thread.join)
    server.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n⛔ Program dihentikan.")
