
import { Button } from '@/components/ui/button';

export default function StepNavigator({ stepIndex, totalSteps, onNext, onPrev }: any) {
  return (
    <div className="flex justify-between mt-4">
      {stepIndex > 0 && <Button type="button" onClick={onPrev}>Previous</Button>}
      {stepIndex < totalSteps - 1 && <Button type="button" onClick={onNext}>Next</Button>}
      {stepIndex === totalSteps - 1 && <Button type="submit">Submit</Button>}
    </div>
  );
}