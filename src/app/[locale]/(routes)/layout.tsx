import Sidebar from '@/components/Sidebar/Sidebar';
import {
  LayoutChildrenWrapper,
  LayoutParentDiv,
} from '@/components/Wrappers/Wrappers';
import React from 'react';

const layoutCSSSidebar = 'fixed h-screen w-[250px] z-10';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutParentDiv>
      <Sidebar className={`${layoutCSSSidebar} `} />
      <LayoutChildrenWrapper>{children}</LayoutChildrenWrapper>
    </LayoutParentDiv>
  );
};

export default layout;

// 1. outer div  : sorted
// 2. sidebar : sorted
// 3. children
