Vue.component('cell', {
    data: function () {
        return {
            classObject: {
                active: false,
                fading: false
            }
        }
    },
    props: ['w', 'h'],
    methods: {
        setActive: function (state) {
            this.classObject.active = state
            this.classObject.fading = !state
        }
    },
    template: '<div class="cell"\
                    :class="classObject"\
                    v-on:mouseenter="setActive(true)"\
                    v-on:mouseleave="setActive(false)"\
                    :style="{ height: h, width: w } ">\
                </div>'
})

var app = new Vue({
    el: "#app",
    data: {
        cells: [],
        cellHeight: '1px',
        cellWidth: '1px',
        nextCellId: 0,
    },
    methods: {
        resizeCells: function () {
            var factor = 20

            var w = window.innerWidth
            var h = window.innerHeight

            var min = w
            var max = h
            if (w > h) {
                min = h
                max = w
            }

            var cellMin = min / factor
            var fit = Math.floor(max / cellMin)
            var cellMax = max / fit

            cellMin = cellMin + 'px'
            cellMax = cellMax + 'px'

            if (w > h) {
                this.cellWidth = cellMax
                this.cellHeight = cellMin
            } else {
                this.cellWidth = cellMin
                this.cellHeight = cellMax
            }

            var numCells = factor * fit

            var diff = numCells - this.cells.length
            if (diff > 0) {
                for (var i = 0; i < diff; i++) {
                    this.cells.push({ id: this.nextCellId++ })
                }
            } else {
                this.cells.splice(numCells)
                nextCellId = numCells
            }
        }
    },
    created: function () {
        this.resizeCells()
        window.addEventListener('resize', this.resizeCells)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.resizeCells)
    }
})
