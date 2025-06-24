
import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50">
      <CardContent className="p-6">
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
