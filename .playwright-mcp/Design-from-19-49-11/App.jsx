import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export default function App() {
	const [currentTrack, setCurrentTrack] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);

	const tracks = [
		{ id: 1, title: 'Midnight Dreams', artist: 'Luna Echo', duration: 245 },
		{ id: 2, title: 'Electric Pulse', artist: 'Neon Waves', duration: 198 },
		{ id: 3, title: 'Cosmic Journey', artist: 'Star Dust', duration: 267 },
		{ id: 4, title: 'Velvet Nights', artist: 'Indigo Soul', duration: 223 },
		{ id: 5, title: 'Golden Hour', artist: 'Sunset Vibes', duration: 212 },
	];

	const gradients = [
		'from-purple-600 to-pink-500',
		'from-blue-600 to-cyan-500',
		'from-orange-600 to-red-500',
		'from-indigo-600 to-purple-500',
		'from-yellow-600 to-orange-500',
	];

	useEffect(() => {
		let interval;
		if (isPlaying) {
			interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						handleSkipNext();
						return 0;
					}
					return prev + 0.5;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isPlaying, currentTrack]);

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleSkipNext = () => {
		setCurrentTrack((prev) => (prev + 1) % tracks.length);
		setProgress(0);
	};

	const handleSkipPrev = () => {
		setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
		setProgress(0);
	};

	const handleTrackSelect = (index) => {
		setCurrentTrack(index);
		setProgress(0);
		setIsPlaying(true);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const currentDuration = tracks[currentTrack].duration;
	const elapsedTime = Math.floor((progress / 100) * currentDuration);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
			<div className="w-full max-w-md">
				{/* Now Playing Card */}
				<div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl mb-6">
					{/* Album Art */}
					<div className={`bg-gradient-to-br ${gradients[currentTrack]} rounded-xl h-56 flex items-center justify-center mb-6 shadow-lg`}>
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className={`w-1 bg-white rounded-full transition-all duration-300 ${
										isPlaying ? 'animate-pulse' : ''
									}`}
									style={{
										height: `${20 + Math.random() * 40}px`,
										animationDelay: `${i * 0.1}s`,
									}}
								/>
							))}
						</div>
					</div>

					{/* Track Info */}
					<div className="text-center mb-6">
						<h2 className="text-2xl font-bold text-white mb-2">
							{tracks[currentTrack].title}
						</h2>
						<p className="text-slate-400 text-sm">{tracks[currentTrack].artist}</p>
					</div>

					{/* Progress Bar */}
					<div className="mb-4">
						<div className="bg-slate-600 rounded-full h-2 mb-2 overflow-hidden">
							<div
								className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<div className="flex justify-between text-xs text-slate-400">
							<span>{formatTime(elapsedTime)}</span>
							<span>{formatTime(currentDuration)}</span>
						</div>
					</div>

					{/* Controls */}
					<div className="flex items-center justify-center gap-6 mb-6">
						<button
							onClick={handleSkipPrev}
							className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-colors"
						>
							<SkipBack size={20} />
						</button>

						<button
							onClick={handlePlayPause}
							className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all shadow-lg"
						>
							{isPlaying ? <Pause size={28} /> : <Play size={28} />}
						</button>

						<button
							onClick={handleSkipNext}
							className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-colors"
						>
							<SkipForward size={20} />
						</button>
					</div>
				</div>

				{/* Playlist */}
				<div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 shadow-2xl">
					<h3 className="text-white font-bold text-lg mb-4 px-2">Playlist</h3>
					<div className="space-y-2">
						{tracks.map((track, index) => (
							<button
								key={track.id}
								onClick={() => handleTrackSelect(index)}
								className={`w-full p-3 rounded-lg transition-all text-left ${
									currentTrack === index
										? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
										: 'bg-slate-700 text-slate-200 hover:bg-slate-600'
								}`}
							>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-sm">{track.title}</p>
										<p className="text-xs opacity-75">{track.artist}</p>
									</div>
									<span className="text-xs opacity-75">{formatTime(track.duration)}</span>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
