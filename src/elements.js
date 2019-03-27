import * as d3 from 'd3'
import { data, indicateurs } from './getData'
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  CIRCLE_RADIUS,
  SWISS_FLAG_URL,
} from './config'

const body = d3.select('body')

export const selectX = body.append('select')

selectX.selectAll('option')
  .data(indicateurs)
  .enter()
  .append('option')
  .attr('value', d => d)
  .text(d => d)

export const selectY = body.append('select')

selectY.selectAll('option')
  .data(indicateurs)
  .enter()
  .append('option')
  .attr('value', d => d)
  .text(d => d)

export const svg = body.append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const defs = svg.append('defs')
  .append('clipPath')
    .attr('id', 'circle-clip')
    .append('circle')
      .attr('cx', CIRCLE_RADIUS)
      .attr('cy', CIRCLE_RADIUS)
      .attr('r', CIRCLE_RADIUS)
/*
  <defs>
    <clipPath id="c">
      <circle cx="20" cy="20" r="20" />
    </clipPath>
  </defs>
*/

const circleGroup = svg.append('g')
  .attr('transform', `translate(${-CIRCLE_RADIUS},${-CIRCLE_RADIUS})`)

export const circles = circleGroup.selectAll('image')
  .data(data)
  .enter()
  .append('image')
  .attr('width', CIRCLE_RADIUS * 2)
  .attr('height', CIRCLE_RADIUS * 2)
  .attr('xlink:href', SWISS_FLAG_URL)
  .attr('clip-path', 'url(#circle-clip)')
  .attr('transform', 'translate(0,0)')

export const xAxis = d3.axisBottom()
  .ticks(4)

export const bottomAxis = svg.append('g')
  .attr('transform', `translate(0, ${HEIGHT - MARGIN})`)

export const yAxis = d3.axisLeft()

export const leftAxis = svg.append('g')
  .attr('transform', `translate(${MARGIN}, 0)`)