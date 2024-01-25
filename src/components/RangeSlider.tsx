import { Label } from '@fluentui/react-components';
import styled from 'styled-components';

export const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, threshold, score }) => {

  return (
    <StyledRangeSlider>
      <StyledLabel size="small" weight="semibold">{min}</StyledLabel>
      <StyledSlider>
        <StyledGoodArea min={min} max={max} threshold={threshold}/>
        <StyledBadArea min={min} max={max} threshold={threshold}/>
        <ScoreMark min={min} max={max} score={score} threshold={threshold}/>
      </StyledSlider>
      <StyledLabel size="small" weight="semibold">{max}</StyledLabel>
    </StyledRangeSlider>
  );
}

const StyledRangeSlider = styled.div`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          column-gap: 8px;
          width: 100%;
          color: #3b3b3b;
          margin-bottom: 8px;
  `,
  StyledLabel = styled(Label)`
    color: #626262;
  `,
  StyledSlider = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    column-gap: 3px;
    width: 100%;
  `,
  StyledGoodArea = styled.div<Omit<RangeSliderProps, 'score'>>`
    width: ${({ min, max, threshold }) => `calc(${(threshold - min) / (max - min) * 100}% - 5px)`};
    height: 8px;
    border-radius: 6px;
    background-color: #cee8c1;
    color: white;
    font-size: 12px;
  `,
  StyledBadArea = styled.div<Omit<RangeSliderProps, 'score'>>`
    width: ${({ min, max, threshold }) => `calc(${(max - threshold) / (max - min) * 100}% + 5px)`};
    height: 8px;
    border-radius: 6px;
    background-color: #f68e8e;
    color: white;
    font-size: 12px;
  `,
  ScoreMark = styled.div<RangeSliderProps>`
    position: absolute;
    top: 0;
    right: ${({ min, max, score }) => `${(score - min) / (max - min) * 100}%`};
    width: ${({ score, threshold }) => score >= threshold ? '2px' : '1px'};;
    height: 100%;
    background-color: #5d5d5d;
    &::before {
      content: '${({ score }) => score}';
      font-size: 14px;
      position: absolute;
      top: 100%;
      right: 0;
      transform: translateX(50%);
      font-weight: ${({ score, threshold }) => score >= threshold ? 600 : 400};
    }
  `;

type RangeSliderProps = {
  min: number;
  max: number;
  threshold: number;
  score: number;
}
