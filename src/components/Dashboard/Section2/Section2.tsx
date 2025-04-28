import CustomMap from '@/components/Utility_Components/Maps/Map';
import { Section2Wrapper } from '@/components/Wrappers/Dashboard_Wrappers';

const Section2 = () => {

  return (
    <Section2Wrapper>
      <CustomMap filters height="85%" />
    </Section2Wrapper>
  );
};

export default Section2;
