export interface StartupFormProps {
    title: string;
    description: string;
    category: string;
    link: string;
    pitch: string;
}

// types.ts
export interface ActionResponse {
  success: boolean;
  message: string;
  startupId?: string; // Add this line
  errors?: {
    [K in keyof StartupFormProps]?: string[];
  };
}

