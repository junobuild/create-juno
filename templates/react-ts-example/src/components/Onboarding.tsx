import { FC, useEffect, useState } from "react";

type StepId = "satellite" | "config" | "datastore" | "storage";

type StepCompleted = boolean;

interface UiStepAction {
  description: string;
  label: string;
  url: string;
}

interface UiStep {
  description: string;
  action?: UiStepAction;
  status: "todo" | "pending" | "completed";
}

interface OnboardingProps {
  // eslint-disable-next-line no-unused-vars
  onComplete: (completed: boolean) => void;
}

export const Onboarding: FC<OnboardingProps> = ({ onComplete }) => {
  const [uiSteps, setUiSteps] = useState<Record<StepId, UiStep>>({
    satellite: {
      description: "Your project needs a Satellite for local dev.",
      action: {
        description: "Create one now!",
        label: "Open the Juno Console to create a new Satellite for testing",
        url: "http://localhost:5866",
      },
      status: "todo",
    },
    config: {
      description:
        "Set the Satellite ID in your juno.config file and restart the development server.",
      status: "pending",
    },
    datastore: {
      description: "Create a 'notes' collection for your documents.",
      action: {
        description: "Open Datastore",
        label: "Open the Datastore in the Juno Console",
        url: "http://localhost:5866/datastore",
      },
      status: "pending",
    },
    storage: {
      description: "Create an 'images' collection to store assets.",
      action: {
        description: "Open Storage",
        label: "Open the Storage in the Juno Console",
        url: "http://localhost:5866/storage",
      },
      status: "pending",
    },
  });

  const [steps, setSteps] = useState<Record<StepId, StepCompleted>>({
    satellite: false,
    config: false,
    datastore: false,
    storage: false,
  });

  const [allStepsCompleted, setAllStepsCompleted] = useState<boolean>(true);

  const KEY = "create-juno-onboarding-steps";

  useEffect(() => {
    const savedSteps = localStorage.getItem(KEY);

    if (savedSteps === null) {
      setAllStepsCompleted(false);
      return;
    }

    updateSteps(JSON.parse(savedSteps));
  }, []);

  useEffect(() => {
    onComplete(allStepsCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStepsCompleted]);

  useEffect(() => {
    const updatedUiSteps: Record<StepId, UiStep> = {
      satellite: {
        ...uiSteps.satellite,
        status: steps["satellite"] ? "completed" : "todo",
      },
      config: {
        ...uiSteps.config,
        status: steps["config"]
          ? "completed"
          : uiSteps.satellite.status === "completed" || steps["satellite"]
            ? "todo"
            : "pending",
      },
      datastore: {
        ...uiSteps.datastore,
        status: steps["datastore"]
          ? "completed"
          : uiSteps.config.status === "completed" || steps["config"]
            ? "todo"
            : "pending",
      },
      storage: {
        ...uiSteps.storage,
        status: steps["storage"]
          ? "completed"
          : uiSteps.datastore.status === "completed" || steps["datastore"]
            ? "todo"
            : "pending",
      },
    };

    setUiSteps(updatedUiSteps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  const toggleStep = (stepId: string) => {
    const updatedSteps = {
      ...steps,
      [stepId]: !steps[stepId as StepId],
    };

    updateSteps(updatedSteps);
  };

  const updateSteps = (updatedSteps: Record<StepId, StepCompleted>) => {
    setSteps(updatedSteps);

    localStorage.setItem(KEY, JSON.stringify(updatedSteps));

    const completed = Object.values(updatedSteps).every(
      (completed) => completed,
    );

    setAllStepsCompleted(completed);
  };

  if (!import.meta.env.DEV) {
    return null;
  }

  if (allStepsCompleted) {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
        Getting Started
      </h1>

      <div className="mt-4 w-full max-w-2xl dark:text-white">
        <p className="py-4 md:max-w-lg dark:text-white">
          To start experimenting, please complete the following steps:
        </p>

        <div className="flex flex-col items-start gap-2">
          {Object.entries(uiSteps).map(([stepId, step]) => (
            <label
              key={stepId}
              htmlFor={stepId}
              className={`flex w-full max-w-2xl items-center gap-4 rounded-sm border-[3px] border-black bg-white py-2 transition-all dark:bg-black dark:text-white ${step.status === "pending" ? "opacity-25" : ""}`}
            >
              <input
                type="checkbox"
                className="accent-screamin-green-300 disabled:accent-screamin-green-300 size-5 min-w-6 rounded shadow-sm"
                id={stepId}
                checked={steps[stepId as StepId]}
                onChange={() => toggleStep(stepId)}
                disabled={step.status === "pending"}
              />

              <div>
                <p>
                  <span>{step.description}</span>
                  {step.action !== undefined && step.status === "todo" && (
                    <a
                      href={step.action.url}
                      target="_blank"
                      className={`ml-2 inline-block px-1 ${step.status === "todo" ? "bg-screamin-green-200 rounded-sm font-bold text-black underline" : ""}`}
                      aria-label={step.action.label}
                    >
                      {step.action.description}
                    </a>
                  )}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
