import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const usePathname = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return pathname;
};
