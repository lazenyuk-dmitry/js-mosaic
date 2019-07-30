<template>
  <div>
    <h1>JS Mosaic</h1>

    <div
      class="imagePreview"
      :style="{height: img.height + 'px', width: img.width + 'px'}"
    >
      <img
        v-show="mosaic.previewVisibility"
        ref="originalImg"
        class="originalImg"
        :src="img.src"
        alt="Preview"
      >
      <div class="imgPiecesGrid">
        <div
          v-for="(row, index) in img.pieces"
          :key="index"
          class="imgPiecesGrid-row"
        >
          <div
            v-for="col in row"
            :key="col.id"
            class="imgPiecesGrid-col"
            :style="{
              height: col.height + 'px',
              width: col.width + 'px',
            }"
            :data-id="col.id"
          />
        </div>
      </div>
    </div>

    <div
      ref="imgPieces"
      class="imgPieces"
    >
      <!-- Here generate canvas with image pieces -->
    </div>
  </div>
</template>

<script>
import originalImgUrl from '@/assets/images/imgExample.png';

export default {
  name: 'Main',
  data() {
    return {
      originalImg: new Image(),
      imgReady: false,
      draggableThumb: null,
      draggableItem: null,
      mosaic: {
        rows: 2,
        cols: 3,
        previewVisibility: false,
      },
      img: {
        src: originalImgUrl,
        height: 0,
        width: 0,
        pieces: [],
      },
    };
  },
  watch: {
    imgReady(value) {
      if (value) {
        this.divideImage();
        this.createImgPieces();
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createImgPreview();
    },
    createImgPreview() {
      this.originalImg.src = this.img.src;
      this.originalImg.addEventListener('load', () => {
        this.imgReady = true;
        this.img.height = this.originalImg.height;
        this.img.width = this.originalImg.width;
        this.mosaic.previewVisibility = true;
        setTimeout(() => {
          this.mosaic.previewVisibility = false;
        }, 2000);
      });
    },
    divideImage() {
      const piece = {
        dx: 0,
        dy: 0,
        height: this.img.height / this.mosaic.rows,
        width: this.img.width / this.mosaic.cols,
      };

      for (let row = 1; row <= this.mosaic.rows; row++) {
        this.img.pieces[row - 1] = [];
        const currentRowIndex = row - 1;

        for (let col = 1; col <= this.mosaic.cols; col++) {
          this.img.pieces[currentRowIndex].push(Object.assign({}, { ...piece, id: `${row}-${col}` }));
          piece.dx += piece.width;
        }

        piece.dx = 0;
        piece.dy += piece.height;
      }
    },
    createImgPieces() {
      const piecesBox = this.$refs.imgPieces;

      Object.keys(this.img.pieces).forEach((row) => {
        Object.keys(this.img.pieces[row]).forEach((cell) => {
          const imgPiece = this.img.pieces[row][cell];
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.id = `img-piece-${imgPiece.id}`;
          canvas.classList.add('img-piece');
          canvas.height = imgPiece.height;
          canvas.width = imgPiece.width;

          ctx.drawImage(
            this.originalImg,
            imgPiece.dx,
            imgPiece.dy,
            imgPiece.width,
            imgPiece.height,
            0,
            0,
            imgPiece.width,
            imgPiece.height,
          );

          piecesBox.appendChild(canvas);
          this.piecesDragInit(canvas);
        });
      });
    },
    piecesDragInit(element) {
      element.addEventListener('mousedown', (e) => {
        this.draggableItem = e.target;
        this.draggableThumb = this.cloneCanvas(e.target);

        document.addEventListener('mousemove', this.moveThumb);
        document.addEventListener('mouseup', this.removeDragListeners);
      });
    },
    moveThumb(mouse) {
      const thumb = this.draggableThumb;

      this.draggableItem.style.display = 'none';

      document.body.appendChild(thumb);
      thumb.style.position = 'absolute';
      thumb.style.top = `${mouse.pageY}px`;
      thumb.style.left = `${mouse.pageX}px`;
    },
    removeDragListeners() {
      document.removeEventListener('mousemove', this.moveThumb);
      document.removeEventListener('mouseup', this.removeDragListeners);
    },
    cloneCanvas(canvas) {
      const newCanvas = document.createElement('canvas');
      const context = newCanvas.getContext('2d');

      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;
      context.drawImage(canvas, 0, 0);

      return newCanvas;
    },
  },
};
</script>

<style lang="scss">
  @import '@/styles/variables.scss';

  .imagePreview {
    margin: 20px auto;
    position: relative;

    .originalImg,
    .imgPiecesGrid {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }

  .imgPiecesGrid {
    outline: $image-grid;

    &-row {
      display: flex;
      position: relative;

      &+& {
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          border-top: $image-grid;
        }
      }
    }

    &-col {
      &+& {
        border-left: $image-grid;
      }
    }
  }

  .imgPieces {
    display: flex;
    justify-content: space-around;
  }

  .img-piece {
    transition: 1s;
  }
</style>
