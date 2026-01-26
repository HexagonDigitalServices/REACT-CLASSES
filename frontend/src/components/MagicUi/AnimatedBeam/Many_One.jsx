import React, { forwardRef, useRef } from "react";
import { Beam } from "../Beam";
import ManyOne from "./Many_One"; // Corrected import statement
import i1 from '../../../assets/i1.jpg'
import i2 from '../../../assets/i2.jpg'
import i3 from '../../../assets/i3.jpg'
import i4 from '../../../assets/i4.jpg'
import i5 from '../../../assets/i5.jpg'
import logo from '../../../assets/logo.jpg'
import Std from '../../../assets/Std.jpg'


const Circle = forwardRef(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${className}`}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = "Circle";

export function BeamMultipleOutputDemo({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  return (
    <div
      className={`relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg p-10  ${className}`}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-9 max-w-lg">
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <img src={i1} alt="Teacher" />
          </Circle>
          <Circle ref={div2Ref}>
            <img src={i2} alt="Teacher" />
          </Circle>
          <Circle ref={div3Ref}>
            <img src={i3} alt="Teacher" />
          </Circle>
          <Circle ref={div4Ref}>
            <img src={i4} alt="Teacher" />
          </Circle>
          <Circle ref={div5Ref}>
            <img src={i5} alt="Teacher" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <img src={logo} alt="logo" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <img src={Std} alt="Student" />
          </Circle>
        </div>
      </div>

      <Beam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} />
      <Beam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} />
      <Beam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} />
      <Beam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} />
      <Beam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} />
      <Beam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} />
    </div>
  );
}

export default BeamMultipleOutputDemo;