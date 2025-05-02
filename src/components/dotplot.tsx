//src/components/dotplot.tsx
import { symbol, symbolSquare, symbolCircle } from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

type QPU = {
  name: string;
  type: 'superconducting' | 'trapped_ion';
  qubits: number;
  error: number;
  year: number
  density: number
};

/* hardcoded data
const sampleData: QPU[] = [
  { name: 'IBM', type: 'superconducting', qubits: 127, error: 0.95 },
  { name: 'IonQ', type: 'trapped_ion', qubits: 11, error: 0.9 },
  { name: 'Honeywell H1', type: 'trapped_ion', qubits: 10, error: 0.92 },
  { name: 'Google', type: 'superconducting', qubits: 54, error: 0.88 },
]; */

type DotPlotProps = {
  showSuperconducting: boolean;
  showTrappedIon: boolean;
};

const DotPlot: React.FC<DotPlotProps> = ({
  showSuperconducting,
  showTrappedIon,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<QPU[]>([]);

  useEffect(() => {
    fetch('/qpudata.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<QPU[]>;
      })
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to load QPU data:', err));
  }, []);

  useEffect(() => {
    const width = 800;
    const height = 700;
    const margin = 140;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); 

    svg.attr('width', width).attr('height', height);

    const x = d3.scaleLog()
      .base(10)
      .domain([1, 1e5])
      .range([margin, width - margin]);
      

    const y = d3.scaleLog()
      .base(10)
      .domain([1, 1e-4])
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

    const superMap: Record<string,string> = {
        '-': '⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴',
        '5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'
    };

    const numsX = [1, 10, 100, 1000, 10000, 100000];

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(
        d3.axisBottom(x)
        .tickValues(numsX)
        .tickFormat(d => {
            if (d === 1) return '1';
            const exp = Math.round(Math.log10(Number(d)));
            return `10${superMap[exp.toString()]}`;
        })
      )
      .selectAll('text')
        .attr('font-size', '16px')   
        .attr('fill', '#333'); 

    svg.append('g')
        .attr('transform', `translate(0, ${height - margin})`)
        .call(
          d3.axisBottom(x)
            .ticks(50)           
            .tickSize(4)        
            .tickFormat(() => '')); 
    
    const numsY = [1, .1, .01, .001, .0001];

    svg.append('g')
      .attr('transform', `translate(${margin}, 0)`)
      .call(
        d3.axisLeft(y)
        .tickValues(numsY)
        .tickFormat(d => {
            if (d === 1) return '1';
            const exp = Math.log10(Number(d));
            const sup = exp.toString()
            .split('')
            .map(c => superMap[c] || '')
            .join('');
            return `10${sup}`;
        })
      )
      .selectAll('text')
        .attr('font-size', '16px')   
        .attr('fill', '#333'); 
          

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
    const filteredData = data.filter(d => {
      return (
        (d.type === 'superconducting' && showSuperconducting) ||
        (d.type === 'trapped_ion' && showTrappedIon)
      );
    });

    if (filteredData.length === 0) return; 


    // Drawing dots
    svg.selectAll('.mark')
      .data(filteredData)
      .enter()
      .append('path')
        .attr('class', 'mark')
        .attr('d', d => {
        // choose square or circle
            const type = d.type === 'superconducting'
                ? symbolSquare
                : symbolCircle;
             
            const area = d.type === 'trapped_ion'
                ? d.density
                : 250;
            return symbol().type(type).size(area)(); 
        // size(100) ≈ radius 6; tweak as you like
        })
      .attr('transform', d => 
        `translate(${x(d.qubits)},${y(d.error)})`)
      .attr('fill', d => d.type === 'superconducting' ? '#4A90E2' : '#D35400')
      .attr('opacity', 0.5);
  }, [data, showSuperconducting, showTrappedIon]);

  return <svg ref={svgRef}></svg>;
};

export default DotPlot;
