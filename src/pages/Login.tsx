import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [apiKey, setApiKey] = useState("");
  const [modelId, setModelId] = useState("gpt-4o");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    // Store credentials in localStorage
    localStorage.setItem("openai_api_key", apiKey);
    localStorage.setItem("model_id", modelId);
    
    toast({
      title: "Success",
      description: "Credentials saved successfully",
    });
    
    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to ChatGPT</h1>
          <p className="text-muted-foreground">Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelId">Model ID</Label>
            <Input
              id="modelId"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="bg-white/5"
            />
            <p className="text-xs text-muted-foreground">Default: gpt-4o</p>
          </div>

          <Button type="submit" className="w-full">
            Continue to Chat
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;