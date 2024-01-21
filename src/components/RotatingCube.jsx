'use client';

import React, { useEffect, useState } from 'react';

/**
 * RotatingCube component creates a 3D rotating cube.
 * The animation is synchronized across multiple browser windows using a global time reference (Date.now()).
 * This approach ensures that the cube's rotation state is consistently calculated based on the elapsed time
 * since the Unix epoch, providing synchronization in animation across different instances.
 */
const RotatingCube = () => {
    // States for controlling rotation and size of the cube
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [cubeSize, setCubeSize] = useState(300); // Cube size in pixels

    // Duration for one full rotation in seconds
    const rotationDuration = 8;

    useEffect(() => {
        // Animation loop for rotating the cube
        let animationFrameId;

        const animate = () => {
            // Calculate current time within the rotation cycle
            const time = (Date.now() / 1000) % rotationDuration;
            // Update rotation state based on elapsed time
            setRotation({
                x: time * 360 / rotationDuration,
                y: time * 360 / rotationDuration
            });
            // Request next frame in the animation
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        // Clean up function to cancel animation frame on component unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, [rotationDuration]);

    // Style for the cube container
    const cubeStyle = {
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
    };

    // Function to generate style for each face of the cube
    const faceStyle = (transform) => ({
        position: 'absolute',
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        border: '1px solid rgba(255, 255, 255, 0.9)',
        background: 'rgba(240, 240, 240, 0.6)',
        lineHeight: `${cubeSize}px`,
        textAlign: 'center',
        fontSize: '20px',
        transform
    });

    // Render the cube with 6 faces
    return (
        <div style={{ width: `${cubeSize}px`, height: `${cubeSize}px`, perspective: '15cm' }}>
            <div style={cubeStyle}>
                <div style={faceStyle(`translateZ(${cubeSize / 2}px)`)}>Front</div>
                <div style={faceStyle(`rotateY(90deg) translateZ(${cubeSize / 2}px)`)}>Right</div>
                <div style={faceStyle(`rotateY(180deg) translateZ(${cubeSize / 2}px)`)}>Back</div>
                <div style={faceStyle(`rotateY(-90deg) translateZ(${cubeSize / 2}px)`)}>Left</div>
                <div style={faceStyle(`rotateX(90deg) translateZ(${cubeSize / 2}px)`)}>Top</div>
                <div style={faceStyle(`rotateX(-90deg) translateZ(${cubeSize / 2}px)`)}>Bottom</div>
            </div>
        </div>
    );
};

export default RotatingCube;
