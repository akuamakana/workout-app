import { Button, useColorMode } from '@chakra-ui/react';

const ColorModeToggle: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </header>
  );
};

export default ColorModeToggle;
