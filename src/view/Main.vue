<template>
  <div>
    <h1>JS Mosaic</h1>

    <div ref="imgPieces" />

    <img
      ref="originalImg"
      class="mosaic-img"
      src="@/assets/images/imgExample.png"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      originalImage: null,
      canvas: null,
      img: {
        rows: 2,
        cols: 3,
        height: 0,
        width: 0,
        pieces: [],
      },
    };
  },
  mounted() {
    this.$refs.originalImg.addEventListener('load', () => this.init());
  },
  methods: {
    init() {
      this.originalImage = this.$refs.originalImg;

      this.img.height = this.originalImage.naturalHeight;
      this.img.width = this.originalImage.naturalWidth;

      this.divideImage();
      this.createImgPieces();
    },
    divideImage() {
      const piece = {
        dx: 0,
        dy: 0,
        height: this.img.height / this.img.rows,
        width: this.img.width / this.img.cols,
      };

      let row = 1;

      while (row <= this.img.rows) {
        this.img.pieces[row - 1] = [];
        const currentRowIndex = row - 1;

        for (let col = 1; col <= this.img.cols; col++) {
          this.img.pieces[currentRowIndex].push(Object.assign({}, piece));
          piece.dx += piece.width;
        }

        piece.dx = 0;
        piece.dy += piece.height;
        row++;
      }
    },
    createImgPieces() {
      const piecesBox = this.$refs.imgPieces;

      Object.keys(this.img.pieces).forEach((row) => {
        Object.keys(this.img.pieces[row]).forEach((cell) => {
          const imgPiece = this.img.pieces[row][cell];
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.id = `img-piece-${row}-${cell}`;
          canvas.classList.add('img-piece');
          canvas.height = imgPiece.height;
          canvas.width = imgPiece.width;

          ctx.drawImage(
            this.originalImage,
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
        });
      });
    },
  },
};
</script>

<style lang="scss">

  .mosaic-img {
    margin: 30px auto;
    display: block;
  }

  .canvas {
    display: block;
    margin: 30px auto;
    border: 2px solid green;
  }

  .img-piece {
    display: inline-block;
    margin: 10px;
  }
</style>
