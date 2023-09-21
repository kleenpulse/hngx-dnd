import React from "react";

const LoadingAnimation: React.FC = () => {
	return (
		<div className="animate-spin rounded-full h-28 w-28 border-t-8 border-b-[6px] border-blue-500 border-opacity-50">
			<div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
		</div>
	);
};

export default LoadingAnimation;
