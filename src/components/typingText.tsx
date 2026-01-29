import { TypeAnimation } from 'react-type-animation';

export default function TypingText() {
  return (
    <TypeAnimation
      sequence={[
        'Hello Hel', // Types 'One'
        1000, // Waits 1s
        'Hello World!', // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        '안녕하세요\n  김형윤입니다 INTUITIVE UI / USER ENGAGEMENt / PERFORMANCE / IMPROVEMENT', // Types 'Three' without deleting 'Two'
        () => {
          console.log('>>>>>>>>>>>> Typing completed');
        },
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ whiteSpace: 'pre-line', display: 'block' }}
    />
  );
}
