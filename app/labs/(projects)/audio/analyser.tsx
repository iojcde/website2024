// eslint-disable
// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";

const NOISE_THRESHOLD = 100;
const MIN_FREQ = 20;
const MAX_FREQ = 10000;

const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [frequencyData, setFrequencyData] = useState([]);
  const [maxFrequency, setMaxFrequency] = useState(0);
  const [maxNote, setMaxNote] = useState("N/A");
  const [highestFrequency, setHighestFrequency] = useState(0);
  const [highestNote, setHighestNote] = useState("");
  const [noisePercentage, setNoisePercentage] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const highestFrequencyRef = useRef(0);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [isRecording]);

  const startRecording = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 4096;
      analyserRef.current.smoothingTimeConstant = 0.85;
    }

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      analyse();
    } catch (err) {
      console.error("Error accessing the microphone", err);
    }
  };

  const stopRecording = () => {
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  };

  const analyse = () => {
    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const dataArray = [...dataArrayRef.current];
      setFrequencyData(dataArray);

      // Find the max frequency in the current frame, ignoring background noise
      const maxFreqIndex = dataArray.reduce((maxIndex, value, index) => {
        return value > dataArray[maxIndex] && value > NOISE_THRESHOLD
          ? index
          : maxIndex;
      }, 0);

      const maxFrequency =
        (maxFreqIndex * (audioContextRef.current.sampleRate / 2)) /
        dataArray.length;

      if (dataArray[maxFreqIndex] > NOISE_THRESHOLD) {
        setMaxFrequency(maxFrequency);
        setMaxNote(frequencyToNoteName(maxFrequency));
        // Calculate noise percentage
        const maxAmplitude = dataArray[maxFreqIndex];
        const noisePercentage =
          ((maxAmplitude - NOISE_THRESHOLD) / (255 - NOISE_THRESHOLD)) * 100;
        setNoisePercentage(noisePercentage);
      }

      // Update the highest frequency observed
      if (
        maxFrequency > highestFrequencyRef.current &&
        dataArray[maxFreqIndex] > NOISE_THRESHOLD
      ) {
        highestFrequencyRef.current = maxFrequency;
        setHighestFrequency(maxFrequency);
        const note = frequencyToNoteName(maxFrequency);
        setHighestNote(note);
      }

      animationFrameIdRef.current = requestAnimationFrame(analyse);
    }
  };

  const frequencyToNoteName = (frequency) => {
    const A4 = 440;
    const C0 = A4 * Math.pow(2, -4.75);
    const halfSteps = Math.round(12 * Math.log2(frequency / C0));
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = halfSteps % 12;
    if (noteNames[noteIndex]) {
      return `${noteNames[noteIndex]}${octave}`;
    }
  };

  return (
    <div>
      <button
        className="font-mono text-xs text-gray-11 p-2 border border-gray-4 rounded bg-gray-3"
        onClick={() => setIsRecording(!isRecording)}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <FrequencyVisualizer
        frequencyData={frequencyData}
        audioContext={audioContextRef.current}
      />

      <div className="text-4xl mb-4">{maxNote}</div>
      <div className="text-gray-11">
        Current Pitch: ({maxNote}) {maxFrequency.toFixed(2)} Hz{" "}
        {noisePercentage.toFixed(2)}
      </div>
      <div className="text-gray-11">
        Highest Frequency: {highestFrequency.toFixed(2)} Hz ({highestNote})
      </div>
    </div>
  );
};

const FrequencyVisualizer = ({ frequencyData, audioContext }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (audioContext) {
        const nyquist = audioContext.sampleRate / 2;
        const minIndex = Math.floor(
          (MIN_FREQ / nyquist) * frequencyData.length
        );
        const maxIndex = Math.ceil((MAX_FREQ / nyquist) * frequencyData.length);

        // Draw frequency data
        ctx.fillStyle = "rgb(200, 0, 0)";
        for (let i = minIndex; i < maxIndex; i++) {
          const value = frequencyData[i];
          if (value > NOISE_THRESHOLD) {
            const freq = (i / frequencyData.length) * nyquist;
            const x = logScale(freq, MIN_FREQ, MAX_FREQ) * width;
            const barHeight =
              ((value - NOISE_THRESHOLD) / (255 - NOISE_THRESHOLD)) * height;
            const barWidth = 2; // Fixed width for better visibility
            ctx.fillRect(x, height - barHeight - 30, barWidth, barHeight);
          }
        }
      }

      drawAxis(ctx, width, height, audioContext);
    };

    draw();
  }, [frequencyData, audioContext]);

  const logScale = (value, min, max) => {
    const minLog = Math.log(min);
    const maxLog = Math.log(max);
    return (Math.log(value) - minLog) / (maxLog - minLog);
  };

  const drawAxis = (ctx, width, height, audioContext) => {
    if (!audioContext) return;

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.font = "10px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Draw x-axis (frequency)
    ctx.beginPath();
    ctx.moveTo(0, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();

    // Define frequency ticks and corresponding note names
    const freqTicks = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000].map(
      (freq) => ({ freq, label: freq >= 1000 ? `${freq / 1000}k` : `${freq}` })
    );

    const noteFreqs = [
      { freq: 261.63, note: "C4" },
      { freq: 523.25, note: "C5" },
      { freq: 1046.5, note: "C6" },
      { freq: 2093.0, note: "C7" },
      { freq: 4186.01, note: "C8" },
    ];

    // Draw frequency ticks, labels, and note names
    freqTicks.concat(noteFreqs).forEach((item) => {
      const x = logScale(item.freq, MIN_FREQ, MAX_FREQ) * width;
      ctx.beginPath();
      ctx.moveTo(x, height - 30);
      ctx.lineTo(x, height - 25);
      ctx.stroke();

      if (item.label) {
        ctx.fillText(item.label, x, height - 20);
      }
      if (item.note) {
        ctx.fillText(item.note, x, height - 45);
      }
    });

    // Draw y-axis (amplitude)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height - 30);
    ctx.stroke();

    // Draw amplitude ticks and labels
    for (let i = 0; i <= 5; i++) {
      const y = (height - 30) * (1 - i / 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(5, y);
      ctx.stroke();
      ctx.fillText(`${i * 20}%`, 10, y - 5);
    }
  };

  return <canvas className="mt-8" ref={canvasRef} width="1000" height="400" />;
};

export default AudioRecorder;
