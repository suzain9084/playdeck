import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
    "Connect all the devices to the same WiFi",
    "Open playdeck.com on your PC (Recommended: Chrome)",
    'Click on "Start playing now" to get the connect code',
];

const MobileCodeInput = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");

    useEffect(() => {
        if (currentStep === -1) {
            navigate("/");
        }
    }, [currentStep, navigate]);

    const clearCode = () => setCode("");
    const submitCode = () => {
        console.log("Submitting code:", code);
    };

    useEffect(() => {
        if (currentStep === -1) {
            navigate("/");
        }
    }, [currentStep, navigate])

    return (
        <div className="h-screen bg-background text-white flex flex-col items-center justify-between px-6 py-8">
            <div className="absolute top-0 left-0 text-white p-2 m-1" onClick={() => setCurrentStep(currentStep - 1)}><ArrowLeft className="w-8 h-8" /></div>
            {currentStep === 0 && <> <div className="flex flex-col items-center gap-6 h-screen w-full">
                <div className="w-full max-w-xs bg-background rounded-xl p-4 flex items-center justify-center">
                    <div className="w-full h-40 bg-gray-600 rounded-md flex items-center justify-center text-sm text-gray-300">
                        Game Screen Illustration
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center">
                    Connect to your PC
                </h2>

                <div className="w-full max-w-md flex flex-col align-middle gap-4 mt-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 w-full"
                        >
                            <div className="text-3xl font-bold text-gray-100 w-6 self-center">
                                {index + 1 + "."}
                            </div>

                            <p className="text-gray-300 text-base leading-relaxed self-center">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

                <Button variant="hero" size="xl" onClick={() => setCurrentStep(currentStep + 1)} >
                    I've got the connect code
                </Button></>}
            {currentStep === 1 && <div className="relative h-screen w-full px-2">
                <div className="w-full mb-12 mt-8 flex flex-col gap-5">
                    <div className="flex flex-col justify-center gap-3 bg-background rounded-[1px]">
                        <div className="rounded-[1px] transform">
                            <span className="text-gray-200 text-[1.2rem]">Name*</span>
                        </div>
                        <Input className="text-xl font-medium tracking-widest text-gray-100 h-16" value={name} placeholder="Enter the Name" />
                    </div>
                    <div className="flex flex-col justify-center gap-3 bg-background rounded-[1px]">
                        <div className="rounded-[1px] transform">
                            <span className="text-gray-200 text-[1.2rem]">Code*</span>
                        </div>
                        <Input className="text-xl font-medium tracking-widest text-gray-100 h-16" value={code} type="" placeholder="Enter the code" />
                    </div>
                </div>

                {/* Keypad Grid */}
                <div className="absolute bottom-2 flex justify-between w-full px-4">
                    {/* Clear Button */}
                    <button
                        onClick={clearCode}
                        className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        <X className="w-8 h-8 text-red-500 stroke-[3px]" />
                    </button>
                    {/* Confirm Button */}
                    <button
                        onClick={submitCode}
                        className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        <Check className="w-10 h-10 text-green-500 stroke-[3px]" />
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default MobileCodeInput;
