import { useState, useEffect } from 'react';
import { BsMicFill, BsStopFill, BsPlayFill, BsArrowRepeat } from 'react-icons/bs';
import toast from 'react-hot-toast';
import './index.css';

const MAX_RECORD_TIME = 300; // 5 minutes in seconds

function VoiceRecorder({ onRecordingComplete, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let timerId = null;

    if (isRecording) {
      timerId = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev + 1 >= MAX_RECORD_TIME) {
            stopRecording();
            toast.success('Maximum recording time reached (5 minutes).');
            return MAX_RECORD_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        if (mediaRecorder.stream) {
          mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        }
      }
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [mediaRecorder, audioPreviewUrl]);

  const startRecording = async () => {
    try {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      setRecordedBlob(null);
      setAudioPreviewUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const options = { mimeType: 'audio/webm;codecs=opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'audio/webm';
      }

      const recorder = new MediaRecorder(stream, options);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedBlob(audioBlob);

        const previewUrl = URL.createObjectURL(audioBlob);
        setAudioPreviewUrl(previewUrl);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Microphone access error:', error.message);
      toast.error('Could not access microphone. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const handleSubmit = () => {
    if (recordedBlob) {
      onRecordingComplete(recordedBlob);
      setRecordedBlob(null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }
      setRecordingTime(0);
    }
  };

  const handleReRecord = () => {
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
    }
    setRecordedBlob(null);
    setAudioPreviewUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="voice-recorder">
      {!recordedBlob ? (
        <div className="voice-recorder-record-panel">
          <button
            className={`voice-recorder-btn ${isRecording ? 'voice-recorder-btn-stop' : 'voice-recorder-btn-record'} ${disabled ? 'voice-recorder-btn-disabled' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={disabled}
          >
            {isRecording ? (
              <BsStopFill className="voice-recorder-icon" />
            ) : (
              <BsMicFill className="voice-recorder-icon" />
            )}
          </button>

          {isRecording ? (
            <div className="voice-recorder-recording-info">
              <span className="voice-recorder-dot" />
              <span className="voice-recorder-time">{formatTime(recordingTime)}</span>
              <span className="voice-recorder-label">Recording — click to stop</span>
            </div>
          ) : (
            <p className="voice-recorder-hint">Click the mic to start recording</p>
          )}
        </div>
      ) : (
        <div className="voice-recorder-preview-panel">
          <audio controls src={audioPreviewUrl} className="voice-recorder-audio" />
          <div className="voice-recorder-preview-actions">
            <button className="voice-recorder-rerecord-btn" onClick={handleReRecord}>
              <BsArrowRepeat className="voice-recorder-btn-icon" />
              Re-record
            </button>
            <button className="voice-recorder-submit-btn" onClick={handleSubmit}>
              <BsPlayFill className="voice-recorder-btn-icon" />
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceRecorder;