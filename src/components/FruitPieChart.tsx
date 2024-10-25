import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Fruit } from '../hooks/useFruits';
import '../styles/FruitPieChart.scss';

interface FruitPieChartProps {
  fruits: Fruit[];
  colorScale: d3.ScaleOrdinal<string, string>;
  onHoverFruit: (fruitName: string | null) => void;
}

const FruitPieChart: React.FC<FruitPieChartProps> = ({ fruits, colorScale, onHoverFruit }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    svg.selectAll('*').remove();

    const pie = d3.pie<Fruit>().value((fruit) => fruit.nutritions.calories);
    const data_ready = pie(fruits);
    const arc = d3.arc<d3.PieArcDatum<Fruit>>().innerRadius(0).outerRadius(radius);

    // pie chart 
    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.name))
      .attr('stroke', '#fff')
      .style('stroke-width', '2px')
      .on('mouseenter', (event, d) => {
        onHoverFruit(d.data.name);
      })
      .on('mouseleave', () => {
        onHoverFruit(null);
      });
  }, [fruits, colorScale, onHoverFruit]);

  return <div className="pie-chart">
    <svg ref={svgRef} />
    </div>;
    
};

export default FruitPieChart;
