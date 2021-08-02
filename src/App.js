import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Link,
  VStack,
  HStack,
  Grid,
  theme,
  Image,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from '@chakra-ui/react';

import mergeImages from 'merge-images';

import nose from '../src/alpaca/nose.png';

import hairBang from '../src/alpaca/hair/bang.png';
import hairCurls from '../src/alpaca/hair/curls.png';
import hairDefault from '../src/alpaca/hair/default.png';
import hairElegant from '../src/alpaca/hair/elegant.png';
import hairFancy from '../src/alpaca/hair/fancy.png';
import hairShort from '../src/alpaca/hair/short.png';

import earsDefault from '../src/alpaca/ears/default.png';
import earsTiltBackward from '../src/alpaca/ears/tilt-backward.png';
import earsTiltForward from '../src/alpaca/ears/tilt-forward.png';

import eyesAngry from '../src/alpaca/eyes/angry.png';
import eyesDefault from '../src/alpaca/eyes/default.png';
import eyesNaughty from '../src/alpaca/eyes/naughty.png';

import mouthAstonished from '../src/alpaca/mouth/astonished.png';
import mouthDefault from '../src/alpaca/mouth/default.png';
import mouthEating from '../src/alpaca/mouth/eating.png';
import mouthLaugh from '../src/alpaca/mouth/laugh.png';
import mouthTongue from '../src/alpaca/mouth/tongue.png';

import neckThick from '../src/alpaca/neck/thick.png';
import neckDefault from '../src/alpaca/neck/default.png';
import neckBendBackward from '../src/alpaca/neck/bend-backward.png';
import neckBendForward from '../src/alpaca/neck/bend-forward.png';

import legDefault from '../src/alpaca/leg/default.png';
import cookie from '../src/alpaca/leg/cookie.png';
import bubbleTea from '../src/alpaca/leg/bubble-tea.png';
import gameConsole from '../src/alpaca/leg/game-console.png';
import tiltBackward from '../src/alpaca/leg/tilt-backward.png';
import tiltForward from '../src/alpaca/leg/tilt-forward.png';

import blue50 from '../src/alpaca/backgrounds/blue50.png';
import blue60 from '../src/alpaca/backgrounds/blue60.png';
import red50 from '../src/alpaca/backgrounds/red50.png';
import green50 from '../src/alpaca/backgrounds/green50.png';

const face = {
  hair: {
    default: hairDefault,
    bang: hairBang,
    curls: hairCurls,
    elegant: hairElegant,
    fancy: hairFancy,
    short: hairShort,
  },
  ears: {
    default: earsDefault,
    'Tilt Backward': earsTiltBackward,
    'Tilt Forward': earsTiltForward,
  },
  eyes: {
    default: eyesDefault,
    angry: eyesAngry,
    naughty: eyesNaughty,
  },
  mouth: {
    default: mouthDefault,
    astonished: mouthAstonished,
    eating: mouthEating,
    laugh: mouthLaugh,
    tongue: mouthTongue,
  },
  neck: {
    default: neckDefault,
    thick: neckThick,
    'Bend Backward': neckBendBackward,
    'Bend forward': neckBendForward,
  },
  leg: {
    default: legDefault,
    cookie: cookie,
    bubbleTea: bubbleTea,
    'game console': gameConsole,
    'tilt backward': tiltBackward,
    'tilt forward': tiltForward,
  },
  background: {
    blue50,
    blue60,
    red50,
    green50,
  },
};

const options = Object.keys(face)

function randomProps(object) {
  const keyArr = Object.keys(object);
  const item = keyArr[Math.floor(Math.random() * keyArr.length)];
  return object[item];
}

function App() {
  const [img, setImg] = useState('');
  const [alpaca, setAlpaca] = useState({
    background: blue50,
    ears: face.ears.default,
    leg: face.leg.default,
    neck: face.neck.default,
    eyes: face.eyes.default,
    nose: nose,
    mouth: face.mouth.default,
    hair: face.hair.default,
  });
  const imgArr = Object.values(alpaca);
  useEffect(() => {
    mergeImages(imgArr).then(b64 => setImg(b64));
  }, [imgArr])

  const handleClick = (option) => e => {
    // e.preventDefault();
    const value = e.currentTarget.value;
    setAlpaca({ ...alpaca, [option]: face[option][value] });
  };

  const handleRandom = () => {
    setAlpaca({
      ...alpaca,
      background: randomProps(face.background),
      mouth: randomProps(face.mouth),
      hair: randomProps(face.hair),
      ears: randomProps(face.ears),
      eyes: randomProps(face.eyes),
      neck: randomProps(face.neck),
      leg: randomProps(face.leg),
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="gray.300">
        <Grid minH="100vh" py={12}>
          <VStack spacing={2}>
            <Text>Alpaca</Text>
            <Box
              w="32"
              h="32"
              borderRadius="lg"
              bgImage={imgArr.map(src =>`url('${src}')`).reverse().join(',')}
              bgRepeat="no-repeat"
              bgSize="cover"
            ></Box>
            {/* <Image w="32" h="32" src={img} /> */}
            <HStack spacing={2}>
              <Button onClick={handleRandom}>Random</Button>
              <Button as={Link} href={img} download="Alpaca">
                Download
              </Button>
            </HStack>
            <Text>ACCESSORIZE THE ALPACA'S</Text>
            <Tabs size="lg" align="center">
              <TabList>{options.map((opt, i) => <Tab key={i}>{opt}</Tab>)}</TabList>
              <TabPanels>
                {options.map((option, i) => (
                  <TabPanel key={i}>
                    <Text>Style</Text>
                    {Object.keys(face[option]).map((item, key) => (
                      <Button
                        key={key}
                        mx="1"
                        my="1"
                        color="gray.600"
                        border="1px solid white"
                        overflow="hidden"
                        value={item}
                        onClick={handleClick(option)}
                        fontSize="sm"
                        bg={
                          face[option][item] === alpaca[option] ? 'gray.200' : 'none'
                        }
                      >
                        {'hair' === option && (
                          <Box
                            top="-2"
                            w="14"
                            h="14"
                            bgRepeat="no-repeat"
                            bgSize="140%"
                            bgPosition="75% 20%"
                            bgImage={`url(${face[option][item]})`}
                          />
                        )}
                        {item}
                      </Button>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
