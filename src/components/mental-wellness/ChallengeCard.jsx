
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ChallengeCard = ({ challenge }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{challenge.progress}/{challenge.total} Days</span>
          </div>
          <Progress value={(challenge.progress / challenge.total) * 100} />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={challenge.progress === challenge.total ? "outline" : "default"}
        >
          {challenge.progress === challenge.total ? "Completed" : "Continue Challenge"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
