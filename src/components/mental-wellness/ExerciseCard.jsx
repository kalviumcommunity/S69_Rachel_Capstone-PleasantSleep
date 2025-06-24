
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ExerciseCard = ({ exercise, onStart }) => {
  return (
    <Card className="overflow-hidden">
      <div 
        className="w-full h-32 bg-cover bg-center" 
        style={{ backgroundImage: `url(${exercise.image})` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{exercise.title}</CardTitle>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
            {exercise.duration}
          </Badge>
        </div>
        <CardDescription>{exercise.category}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={() => onStart(exercise.id)}
          variant={exercise.completed ? "outline" : "default"}
        >
          {exercise.completed ? "Practice Again" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
