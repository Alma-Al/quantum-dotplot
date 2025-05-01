//src/components/dotplot.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type QPU = {
  name: string;
  type: 'superconducting' | 'trapped_ion';
  qubits: number;
  quality: number;
};

const sampleData: QPU[] = [
  { name: 'IBM', type: 'superconducting', qubits: 127, quality: 0.95 },
  { name: 'IonQ', type: 'trapped_ion', qubits: 11, quality: 0.9 },
  { name: 'Honeywell H1', type: 'trapped_ion', qubits: 10, quality: 0.92 },
  { name: 'Google', type: 'superconducting', qubits: 54, quality: 0.88 },
];

type DotPlotProps = {
  showSuperconducting: boolean;
  showTrappedIon: boolean;
};

const DotPlot: React.FC<DotPlotProps> = ({
  showSuperconducting,
  showTrappedIon,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 800;
    const height = 700;
    const margin = 140;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); 

    svg.attr('width', width).attr('height', height);

    const x = d3.scaleLinear()
      .domain([0, d3.max(sampleData, d => d.qubits)!])
      .range([margin, width - margin]);
      

    const y = d3.scaleLinear()
      .domain([0.85, 1])
      .range([height - margin, margin]);
      
    
    // x-axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - margin + 60)  
      .attr('font-size', '19px')   
      .text('Number of Physical Qubits');
    
    // y-axis label
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${margin - 60}, ${height / 2}) rotate(-90)`)
      .attr('font-size', '19px') 
      .text('Average Two-bit Gate Error Rate');

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(d3.axisBottom(x));
      
    svg.append('g')
      .attr('transform', `translate(${margin}, 0)`)
      .call(d3.axisLeft(y));
    
    // x-axis arrow and label
    const defs = svg.append('defs');
    defs.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 10)            
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 Z')
        .attr('fill', '#333');

    const xCenter    = width / 2;
    const xLabelY    = height - margin + 80;    
    const arrowY     = xLabelY + 20;                 
    const arrowLength= 120;                        

    svg.append('line')
    .attr('x1', xCenter - arrowLength/2)
    .attr('y1', arrowY)
    .attr('x2', xCenter + arrowLength/2)
    .attr('y2', arrowY)
    .attr('stroke', '#333')
    .attr('stroke-width', 1.5)
    .attr('marker-end', 'url(#arrowhead)');

    // label under arrow
    svg.append('text')
    .attr('x', xCenter)
    .attr('y', arrowY + 18)
    .attr('text-anchor', 'middle')
    .attr('font-size', '15px')
    .attr('fill', '#333')
    .text('System size');

    // y-axis arrow and label
    defs.append('marker')
      .attr('id', 'arrowhead-y')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 5)         
      .attr('refY', 5)       
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 0)     
      .append('path')
        .attr('d', 'M2,8 L8,8 L5,2 Z')
        .attr('fill', '#333');
    

    const yArrowX       = margin / 4 - 10    
    const yArrowLength  = 120                   
    const yArrowY2      = height / 2 + 60;
    const yArrowY1      = yArrowY2 - yArrowLength;  
    
    svg.append('line')
        .attr('x1', yArrowX)
        .attr('y1', yArrowY2)
        .attr('x2', yArrowX)
        .attr('y2', yArrowY1)
        .attr('stroke', '#333')
        .attr('stroke-width', 1.5)
        .attr('marker-end', 'url(#arrowhead-y)');
    
    // label by arrow
    svg.append('text')
        .attr('class', 'axis-label')
        .attr(
            'transform',
            `translate(${margin / 4 - 25}, ${height / 2}) rotate(-90)`
        )
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')         
        .attr('font-size', '15px')
        .attr('fill', '#333')
        .text('Error tolerance'); 
      

    // draw dots if true
    const filteredData = sampleData.filter(d => {
      return (
        (d.type === 'superconducting' && showSuperconducting) ||
        (d.type === 'trapped_ion' && showTrappedIon)
      );
    });

    if (filteredData.length === 0) return; 

    // Drawing dots
    svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.qubits))
      .attr('cy', d => y(d.quality))
      .attr('r', 6)
      .attr('fill', d => d.type === 'superconducting' ? 'blue' : 'orange')
      .attr('opacity', 0.8);
  }, [showSuperconducting, showTrappedIon]);

  return <svg ref={svgRef}></svg>;
};

export default DotPlot;