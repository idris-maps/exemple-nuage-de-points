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
import { data } from './getData'
import {
  MARGIN,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from './config'

selectX
  .on('change', function() {
    const key = this.value
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data.map(d => d[key])))
      .range([MARGIN, GRAPH_WIDTH - MARGIN])
    
    xAxis.scale(xScale)

    circles.transition()
      .attr('x', d => xScale(d[key]))
    
    bottomAxis.transition()
      .call(xAxis)
  })

selectY
  .on('change', function() {
    const key = this.value
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data.map(d => d[key])))
      .range([GRAPH_HEIGHT, MARGIN])

    yAxis.scale(yScale)
    
    circles.transition()
      .attr('y', d => yScale(d[key]))
    
    leftAxis.transition()
      .call(yAxis)
  })