import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, InfoIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIStatusProps {
  showDetails?: boolean;
}

interface AIStatusResponse {
  success: boolean;
  message: string;
  apiKey: "configured" | "missing";
}

export default function AIStatus({ showDetails = false }: AIStatusProps) {
  const [status, setStatus] = useState<AIStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkStatus = async () => {
    setLoading(true);
    try {
      // Use a standard fetch call 
      const response = await fetch("/api/ai-status");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Set the status with the response data
      setStatus(data as AIStatusResponse);
    } catch (error) {
      console.error("Error checking AI status:", error);
      toast({
        title: "Error",
        description: "Failed to check AI service status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (!status && loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Checking AI service status...</span>
      </div>
    );
  }

  // Simple badge display for compact view
  if (!showDetails) {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant={status?.success ? "default" : "secondary"}
          className="flex items-center gap-1"
        >
          {status?.success ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <InfoIcon className="h-3 w-3" />
          )}
          <span>
            {status?.success ? "AI Mode" : "Demo Mode"}
          </span>
        </Badge>
      </div>
    );
  }

  // Detailed card view
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>AI Service Status</span>
          {status?.success ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </CardTitle>
        <CardDescription>
          Current status of the OpenAI integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge
              variant={status?.success ? "default" : "secondary"}
              className="justify-self-end"
            >
              {status?.success ? "Active" : "Demo Mode"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <span className="font-medium">API Key:</span>
            <Badge
              variant={status?.apiKey === "configured" ? "outline" : "secondary"}
              className="justify-self-end"
            >
              {status?.apiKey === "configured" ? "Configured" : "Not Configured"}
            </Badge>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">{status?.message}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={checkStatus}
          disabled={loading}
          className="w-full"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Checking..." : "Refresh Status"}
        </Button>
      </CardFooter>
    </Card>
  );
}