import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, HelpCircle, X } from "lucide-react";
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

    useEffect(() => {
        if (currentStep === -1) {
            navigate("/");
        }
    }, [currentStep, navigate]);

    const handleKeyPress = (val: string) => {
        if (code.length < 6) {
            setCode((prev) => prev + val);
        }
    };

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
            {currentStep === 0 && <> <div className="flex flex-col items-center gap-6">
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
                            className="flex items-start gap-4 justify-center"
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
            {currentStep === 1 && <>
                <div className="w-full mb-12 mt-8">
                    <div className="relative flex items-center justify-center gap-3 bg-background border-4 border-[#3b82f6] rounded-xl py-4 px-6 shadow-inner">
                        <div className="absolute bottom-5 left-4 w-6 h-6 rounded-sm transform flex items-center justify-center self-center">
                            <span className="text-green-400 text-[2.5rem] self-center">🎫</span>
                        </div>
                        <span className="text-2xl font-medium tracking-widest text-gray-100">
                            {code || "Enter the code"}
                        </span>
                    </div>
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-3 gap-6 w-full px-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num.toString())}
                            className="w-20 h-20 rounded-full bg-gray-800 text-3xl font-semibold flex items-center justify-center shadow-lg active:scale-90 active:bg-gray-700 transition-all"
                        >
                            {num}
                        </button>
                    ))}

                    {/* Clear Button */}
                    <button
                        onClick={clearCode}
                        className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        <X className="w-8 h-8 text-red-500 stroke-[3px]" />
                    </button>

                    {/* Zero Button */}
                    <button
                        onClick={() => handleKeyPress("0")}
                        className="w-20 h-20 rounded-full bg-gray-800 text-3xl font-semibold flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        0
                    </button>

                    {/* Confirm Button */}
                    <button
                        onClick={submitCode}
                        className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        <Check className="w-10 h-10 text-green-500 stroke-[3px]" />
                    </button>
                </div>

                {/* Footer Link */}
                <button className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-sm text-gray-100 hover:text-white transition-colors font-medium">How to get the connect code?</span>
                </button>
            </>}
        </div>
    );
};

export default MobileCodeInput;
