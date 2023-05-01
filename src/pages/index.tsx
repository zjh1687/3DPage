import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
`;
import dynamic from 'next/dynamic';

const ComponentsWithNoSSR = dynamic(
  // typescript에서 props를 전달할때 interface를 정의해줍니다.
  () => import('./components/ModelScene'), // Component로 사용할 항목을 import합니다.
  { ssr: false }, // ssr옵션을 false로 설정해줍니다.
);

function Home() {
  return (
    <Wrapper>
      <ComponentsWithNoSSR />
    </Wrapper>
  );
}

export default Home;
