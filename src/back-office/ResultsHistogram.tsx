import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { Entry } from './QuestionnairesData';
import { getTestData } from '../data/test-data';

const dayInMs = 1000 * 60 * 60 * 24;
const weekInMs = dayInMs * 7;
const monthInMs = dayInMs * 30;

export const ResultsHistogram = ({ data }: { data: Entry[] }) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // take only the past month's data:
    const testData = getTestData();
    const plots: ((SVGSVGElement | HTMLElement) & Plot.Plot)[] = [];
    for (const interval of [{ date: weekInMs, label: 'Past week' }, { date: monthInMs, label: 'Past month' }]) {
      const plot = Plot.plot({
        title: `Results logged (${interval.label})`,
        x: { round: true, label: 'Date', domain: [new Date(Date.now() - interval.date), new Date()] },
        y: { grid: true, round: true, label: 'Count' },
        marks: [
          Plot.rectY(testData.filter(value => value.created.toDate() > new Date(Date.now() - interval.date) && value.created.toDate() < new Date()),
            Plot.binX({ y: 'count' }, {
                x: {
                  thresholds: '1 day',
                  value: (value => value.created.toDate())
                },
              // @ts-expect-error
              fill: '#575759',
              },
            )),
        ]
      });
      plots.push(plot);
      plot.remove()
      containerRef.current?.append(plot);
    }
    return () => {
      for (const plot of plots) {
        plot.remove();
      }
    };
  }, []);

  return (
    <div className="flex-row align-center full-width full-height" ref={containerRef}>
    </div>
  );
}
