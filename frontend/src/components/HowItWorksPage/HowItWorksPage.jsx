import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import ToggleBtn from './ToggleBtn';
import { howItWorksPageStyles } from '../../assets/dummyStyles';

const HowItWorksPage = () => {
  const [activeTab, setActiveTab] = useState('Tutor');
  const [setAnimateContent] = useState(false);
  const stepRefs = useRef([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => setAnimateContent(true), 300);
  }, []);

  const tutorSteps = [
    {
      title: 'Step 1: Create Your Profile',
      description: `
        Sign up and create a complete tutor profile. Add details like 
        your teaching subjects, certifications, and availability. 
        A compelling profile increases your chances of getting hired.`,
    },
    {
      title: 'Step 2: Upload Verification Documents',
      description: `
        Ensure your credibility by uploading relevant documents, such 
        as degrees or certifications. Verified tutors gain more trust 
        from parents and students.`,
    },
    {
      title: 'Step 3: Search and Apply for Jobs',
      description: `
        Browse a wide variety of tutoring jobs based on your expertise. 
        Tailor your applications to meet the specific needs of each posting.`,
    },
    
    {
      title: 'Step 4: Schedule Classes',
      description: `
        Communicate with parents or students to finalize schedules. 
        Be flexible and professional to establish a good rapport early on.`,
    },
    {
      title: 'Step 5: Start Teaching and Get Feedback',
      description: `
        Begin delivering engaging and effective lessons. Encourage feedback 
        from students and parents to improve your teaching skills.`,
    },
  ];

  const parentSteps = [
    {
      title: 'Step 1: Search for Tutors',
      description: `
        Use filters to find tutors that match your requirements. Check profiles, 
        reviews, and qualifications to identify the best fit for your child.`,
    },
    {
      title: 'Step 2: Contact and Discuss',
      description: `
        Reach out to potential tutors to discuss your child's specific needs, 
        learning goals, and preferred schedule. Clear communication is key!`,
    },
    {
      title: 'Step 3: Hire and Confirm',
      description: `
        Once you've selected the tutor, finalize payment and confirm the schedule. 
        Start the tutoring journey with confidence!`,
    },
    {
      title: 'Step 4: Monitor Your Child\'s Progress',
      description: `
        Keep track of your child's development through periodic updates from the 
        tutor. Stay involved to maximize the learning experience.`,
    },
    {
      title: 'Step 5: Provide Feedback',
      description: `
        Share your experience with the tutor. Positive feedback helps tutors grow 
        and guides other parents in their search for the right tutor.`,
    },
  ];

  const steps = activeTab === 'Tutor' ? tutorSteps : parentSteps;

  // Function to calculate the positions of the connector dots
  const calculateLineCoordinates = () => {
    const coordinates = [];
    stepRefs.current.forEach((ref) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        coordinates.push({
          x: rect.left + rect.width / 2, // Get center of the dot
          y: rect.top + rect.height / 2, // Get center of the dot
        });
      }
    });
    return coordinates;
  };

  useEffect(() => {
    // Trigger the calculation and rendering of the line
    const coordinates = calculateLineCoordinates();
    const svgPath = coordinates
      .map((coord, index) => {
        if (index === 0) {
          return `M${coord.x},${coord.y}`; // Move to the first dot's center
        } else {
          return `L${coord.x},${coord.y}`; // Draw line to the next dot's center
        }
      })
      .join(' ');

    lineRefs.current.setAttribute('d', svgPath);
  }, [steps]); // Re-run when steps change

  return (
    <div className={howItWorksPageStyles.container}>
      {/* Tab Buttons */}
      <div className={howItWorksPageStyles.tabContainer}>
        <ToggleBtn activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Steps Section */}
      <div className={howItWorksPageStyles.stepsSection}>
        {/* Background: Curvy Dotted Line (SVG) */}
        <svg
          className={howItWorksPageStyles.svgLine}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ height: '100vh', width: '100%', pointerEvents: 'none' }}
        >
          <path
            ref={lineRefs}
            fill="transparent"
            stroke="#ccc"
            strokeDasharray="5,5"
            strokeWidth="2"
          />
        </svg>

        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRefs.current[index] = el)} // Store each step's reference
            className={`${howItWorksPageStyles.stepContainer} ${
              index % 2 === 0 ? howItWorksPageStyles.stepContainerEven : ''
            }`}
          >
            {/* Connector Circle */}
            <div className={howItWorksPageStyles.connectorCircle}></div>

            {/* Outer Box */}
            <div
              className={`${howItWorksPageStyles.outerBox} ${
                index % 2 === 0 
                  ? howItWorksPageStyles.outerBoxEven 
                  : howItWorksPageStyles.outerBoxOdd
              }`}
            >
              {/* Inner Colored Box */}
              <div
                className={howItWorksPageStyles.innerBox}
                style={{
                  backgroundColor:
                    activeTab === 'Tutor'
                      ? step.color || '#d1fae5' // Default color for Tutor tab
                      : ' #c7d2fe', // Color for Parent tab
                  color:
                    activeTab === 'Tutor'
                      ? step.textColor || '#059669' // Default text color for Tutor tab
                      : '#075985', // Text color for Parent tab
                }}
              >
                <h2 className={howItWorksPageStyles.stepTitle}>
                  {step.title}
                </h2>
                <p className={howItWorksPageStyles.stepDescription}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Apply Now Button */}
        <div className={howItWorksPageStyles.applyContainer}>
          <NavLink to="/contact">
            <button className={howItWorksPageStyles.applyButton}>
              Apply Now
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;