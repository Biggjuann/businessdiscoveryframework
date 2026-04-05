"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { DiscoveryState, DiscoveryAction } from "@/types/discovery";

const initialState: DiscoveryState = {
  currentStep: 0,
  companyOverview: {
    companyName: "",
    industry: "",
    employeeCount: "",
    annualRevenue: "",
    description: "",
  },
  workflows: {
    departments: [],
    keyProcesses: [],
    currentTools: [],
  },
  painPoints: {
    bottlenecks: [],
    manualTasks: [],
    biggestChallenges: "",
  },
  goals: {
    primaryObjectives: [],
    timeline: "",
    budgetRange: "",
    successMetrics: "",
  },
  techStack: {
    currentSystems: [],
    dataMaturity: "",
    integrationReadiness: 3,
    existingAI: false,
  },
  isComplete: false,
};

function discoveryReducer(state: DiscoveryState, action: DiscoveryAction): DiscoveryState {
  switch (action.type) {
    case "SET_COMPANY_OVERVIEW":
      return { ...state, companyOverview: action.payload };
    case "SET_WORKFLOWS":
      return { ...state, workflows: action.payload };
    case "SET_PAIN_POINTS":
      return { ...state, painPoints: action.payload };
    case "SET_GOALS":
      return { ...state, goals: action.payload };
    case "SET_TECH_STACK":
      return { ...state, techStack: action.payload };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 4) };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case "MARK_COMPLETE":
      return { ...state, isComplete: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const DiscoveryContext = createContext<{
  state: DiscoveryState;
  dispatch: React.Dispatch<DiscoveryAction>;
} | null>(null);

export function DiscoveryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(discoveryReducer, initialState);
  return (
    <DiscoveryContext.Provider value={{ state, dispatch }}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error("useDiscovery must be used within a DiscoveryProvider");
  }
  return context;
}
