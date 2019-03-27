import * as d3 from 'd3'
import {
  selectX,
  selectY,
  circles,
  xAxis,
  yAxis,
  bottomAxis,
  leftAxis,
} from './elements'
import { data } from './data'
import {
  MARGIN,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from './config'

selectX.node().addEventListener('change', e => {
  const key = e.target.value
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d[key])))
    .range([MARGIN, GRAPH_WIDTH - MARGIN])
  
  xAxis.scale(xScale)

  circles.transition()
    .attr('transform', function(d, i, elements) {
      const currentTranslate = elements[i].getAttribute('transform')
      const currentY = currentTranslate.split(',')[1].split(')')[0]
      return `translate(${xScale(d[key])},${currentY})`
    })
  
  bottomAxis.transition()
    .call(xAxis) 
})

selectY.node().addEventListener('change', e => {
  const key = e.target.value
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d[key])))
    .range([GRAPH_HEIGHT, MARGIN])

  yAxis.scale(yScale)
  
  circles.transition()
    .attr('transform', (d, i, elements) => {
      const currentTranslate = elements[i].getAttribute('transform')
      const currentX = currentTranslate.split(',')[0].split('(')[1]
      return `translate(${currentX},${yScale(d[key])})`
    })
  
  leftAxis.transition()
    .call(yAxis)
})