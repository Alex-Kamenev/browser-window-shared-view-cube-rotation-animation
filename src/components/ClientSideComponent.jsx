'use client';

import React, { useState, useEffect, useRef } from 'react';
import RotatingCube from './RotatingCube';

/**
 * ClientSideComponent is responsible for rendering the RotatingCube component 
 * in a position relative to the current browser window and screen dimensions.
 * It calculates the center position of the screen and adjusts the position of the RotatingCube
 * accordingly, ensuring it remains centered as the browser window moves or resizes.
 * This component uses a ref to track the size of its container and requestAnimationFrame
 * to continuously update the position based on the window's current location on the screen.
 */
function ClientSideComponent () {

  // State to hold window and div dimensions.
  const [windowDetails, setWindowDetails] = useState({
    windowX: 0,
    windowY: 0,
    screenWidth: 0,
    screenHeight: 0,
    centerX: 0,
    centerY: 0,
    divSizeWidth: 0,
    divSizeHeight: 0,
  });

  // Reference to the container div.
  const contentRef = useRef(null);

  // Updates the window details.
  const updateWindowDetails = () => {

    // Check if the component is still mounted before updating state.
    if (contentRef.current) {

      setWindowDetails(prevDetails => ({
        ...prevDetails,
        windowX: window.screenX,
        windowY: window.screenY,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        centerX: (window.screen.width / 2) - (window.outerWidth - window.innerWidth),
        centerY: (window.screen.height / 2) - (window.outerHeight - window.innerHeight),
        divSizeWidth: contentRef.current.clientWidth,
        divSizeHeight: contentRef.current.clientHeight,
      }));
    }

    requestAnimationFrame(updateWindowDetails);
  };

  useEffect(() => {

    // Set body style to avoid scrollbars and margin issues.
    document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;';

    // Initialize window details.
    updateWindowDetails();

    return () => {

      // Clean-up function to reset body style and stop animation frame requests.
      document.body.style.cssText = '';

      cancelAnimationFrame(updateWindowDetails);
    };

  }, []);

  const { windowX, windowY, centerX, centerY, divSizeWidth, divSizeHeight } = windowDetails;

  return (
    <div>

      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          // Calculate the translation based on window and div dimensions.
          transform: `translate(${-windowX + centerX - divSizeWidth / 2}px, ${-windowY + centerY - divSizeHeight / 2}px)`,
          whiteSpace: 'nowrap',
        }}
      >

        <RotatingCube />

      </div>

    </div>
  );
}

export default ClientSideComponent;
