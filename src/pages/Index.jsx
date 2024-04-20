import { Box, Center, Text, keyframes } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

// Define keyframes for the falling hearts
const fall = keyframes`
  0% { transform: translateY(-100%); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

// Generate multiple animations with different delays for a more natural look
// Removed the generateAnimations function since it's no longer used

import styled from "@emotion/styled";

// Create a styled component for the falling hearts
// Apply the animations directly within the FallingHeart component using the css prop
const FallingHeart = styled(FaHeart)(() => ({
  position: "fixed",
  color: "white",
  fontSize: `${Math.random() * 1 + 0.5}rem`, // Make them smaller
  animation: `${fall} ${4 + Math.random() * 6}s linear ${Math.random() * 5}s infinite`,
  left: `${Math.random() * 100}vw`,
}));

const FadingText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box ref={ref} mt={20} px={4} opacity={isVisible ? 1 : 0} transform={isVisible ? "none" : "translateY(50px)"} transition="all 1s">
      <Box mt={20} px={4}>
        <Text color="white" fontSize="xl" mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </Text>
        <Text color="white" fontSize="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </Text>
      </Box>
    </Box>
  );
};

const Index = () => {
  return (
    <Box position="relative" minH="200vh" overflow="hidden" bg="black">
      <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Text fontFamily="monospace" fontSize="6xl" color="white">
          Lovable
        </Text>
      </Center>
      <FadingText />
      {Array.from({ length: 50 }).map((_, index) => {
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6;
        const leftPosition = Math.random() * 100;

        return (
          <FallingHeart
            key={index}
            style={{
              animation: `${fall} ${duration}s linear ${delay}s infinite`,
              left: `${leftPosition}vw`,
            }}
          />
        );
      })}
    </Box>
  );
};

export default Index;
