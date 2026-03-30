import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommanRemote from "./commanRemote";
import { toast } from "sonner";
import { useWebSocket } from "@/hooks/websockets";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setConnectionStatus, setName, setRoomId } from "@/lib/appState";
import { Loader } from "lucide-react";
import { toggleFullScreen } from "@/lib/utils";
import consoles from "@/assets/consoles.jpg";

const steps = [
  "Connect all the devices to the same WiFi",
  "Open playdeck.com on your PC (Recommended: Chrome)",
  'Click on "Start playing now" to get the connect code',
];

const MobileCodeInput = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [nameState, setNameState] = useState("");
  const [searchParams] = useSearchParams();
  const [submited, setSubmited] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const connectionStatus = useSelector(
    (state: RootState) => state.appState.connectionStatus,
  );
  const gamePhase = useSelector((state: RootState) => state.appState.gamePhase);
  const socket = useWebSocket(submited ? code : "", submited ? nameState : "");

  useEffect(() => {
    if (currentStep === -1) {
      navigate("/");
    }
  }, [currentStep, navigate, connectionStatus]);

  useEffect(() => {
    toggleFullScreen(dispatch);
  }, [dispatch]);

  const submitCode = useCallback(() => {
    if (nameState.trim() === "" || code.trim() === "") {
      toast.error("Please enter a name and code");
      return;
    }
    dispatch(setConnectionStatus("connecting"));
    setSubmited(true);
  }, [code, nameState, dispatch]);

  useEffect(() => {
    const roomIdFromUrl = searchParams.get("roomid");
    if (roomIdFromUrl) {
      setCode(roomIdFromUrl);
      setCurrentStep(1);
    }
  }, [searchParams]);

  useEffect(() => {
    if (submited) {
      if (socket.current) {
        dispatch(setRoomId(code.trim()));
        dispatch(setName(nameState.trim()));
      } else {
        toast.error("Failed to connect to server");
        console.error("Failed to connect to server");
      }
    }
  }, [socket, dispatch, code, nameState, submited]);

  if (connectionStatus === "connected" && (gamePhase === "lobby" || gamePhase === "playing")) {
    return <CommanRemote socket={socket} />;
  }

  return (
    <div className="h-screen bg-background text-white flex flex-col items-center justify-between px-6 py-8">
      <div
        className="absolute top-0 left-0 text-white p-2 m-1"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        <ArrowLeft className="w-8 h-8" />
      </div>
      {currentStep === 0 && (
        <>
          {" "}
          <div className="flex flex-col items-center gap-6 h-screen w-full">
            <div className="w-full max-w-xs bg-background rounded-xl p-4 flex items-center justify-center">
              <div className="w-full h-48 bg-gray-600 rounded-md flex items-center justify-center text-sm text-gray-300">
                <img
                  src={consoles}
                  alt="game illustration"
                  className="w-full object-fill opacity-100 rounded-sm"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center">
              Connect to your PC
            </h2>

            <div className="w-full max-w-md flex flex-col align-middle gap-4 mt-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 w-full">
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
          <Button
            variant="hero"
            size="xl"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            I've got the connect code
          </Button>
        </>
      )}
      {currentStep === 1 && (
        <div className="relative h-screen w-full px-2">
          <div className="w-full mb-12 mt-8 flex flex-col gap-5">
            <div className="flex flex-col justify-center gap-3 bg-background rounded-[1px]">
              <div className="rounded-[1px] transform">
                <span className="text-gray-200 text-[1.2rem]">Name*</span>
              </div>
              <Input
                className="text-xl font-medium tracking-widest text-gray-100 h-16"
                value={nameState}
                placeholder="Enter the Name"
                onChange={(e) => setNameState(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center gap-3 bg-background rounded-[1px]">
              <div className="rounded-[1px] transform">
                <span className="text-gray-200 text-[1.2rem]">Code*</span>
              </div>
              <Input
                className="text-xl font-medium tracking-widest text-gray-100 h-16"
                value={code}
                type=""
                placeholder="Enter the code"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="absolute bottom-4 flex justify-center w-full px-4">
            <Button
              variant="hero"
              size="xl"
              className="w-full max-w-md"
              onClick={submitCode}
              disabled={connectionStatus === "connecting"}
            >
              {connectionStatus === "connecting" ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>Let's Play</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCodeInput;
