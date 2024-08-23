(function() {
  var Editor, FOLD, LineAssignMode, LineDrawMode, LineEraseMode, LinePaintMode, Mode, VSVG, VertexMoveMode, cli, defaultPage, foldAngleToOpacity, margin, modes;

  margin = 0.5;

  defaultPage = function() {
    return {
      xMin: 0,
      yMin: 0,
      xMax: 4,
      yMax: 4
    };
  };

  FOLD = require('fold');

  foldAngleToOpacity = function(foldAngle, assignment) {
    if (assignment === 'M' || assignment === 'V') {
      return Math.max(0.1, (Math.abs(foldAngle != null ? foldAngle : 180)) / 180);
    } else {
      return 1;
    }
  };

  Editor = class Editor {
    constructor(svg1) {
      this.svg = svg1;
      this.undoStack = [];
      this.redoStack = [];
      this.updateUndoStack();
      this.fold = {
        file_spec: 1.2,
        file_creator: 'Crease Pattern Editor',
        file_classes: ['singleModel'],
        frame_classes: ['creasePattern'],
        vertices_coords: [],
        edges_vertices: [],
        edges_assignment: [],
        edges_foldAngle: [],
        "cpedit:page": defaultPage()
      };
      this.gridGroup = this.svg.group().addClass('grid');
      this.creaseGroup = this.svg.group().addClass('crease');
      this.creaseLine = {};
      this.vertexGroup = this.svg.group().addClass('vertex');
      this.vertexCircle = {};
      this.dragGroup = this.svg.group().addClass('drag');
      this.updateGrid();
    }

    updateGrid() {
      var j, k, page, ref, ref1, ref2, ref3, x, y;
      // Call whenever page dimensions change
      page = this.fold["cpedit:page"];
      if (typeof document !== "undefined" && document !== null) {
        if ((ref = document.getElementById('width')) != null) {
          ref.innerHTML = page.xMax;
        }
      }
      if (typeof document !== "undefined" && document !== null) {
        if ((ref1 = document.getElementById('height')) != null) {
          ref1.innerHTML = page.yMax;
        }
      }
      this.gridGroup.clear();
      for (x = j = 0, ref2 = page.xMax; (0 <= ref2 ? j <= ref2 : j >= ref2); x = 0 <= ref2 ? ++j : --j) {
        this.gridGroup.line(x, page.yMin, x, page.yMax);
      }
      for (y = k = 0, ref3 = page.yMax; (0 <= ref3 ? k <= ref3 : k >= ref3); y = 0 <= ref3 ? ++k : --k) {
        this.gridGroup.line(page.xMin, y, page.xMax, y);
      }
      return this.svg.viewbox(page.xMin - margin, page.yMin - margin, page.xMax - page.xMin + 2 * margin, page.yMax - page.yMin + 2 * margin);
    }

    nearestFeature(pt) {
      var closest, p, page, v, vertex;
      p = [pt.x, pt.y];
      page = this.fold["cpedit:page"];
      closest = [Math.max(page.xMin, Math.min(page.xMax, Math.round(pt.x))), Math.max(page.yMin, Math.min(page.yMax, Math.round(pt.y)))];
      v = FOLD.geom.closestIndex(p, this.fold.vertices_coords);
      if (v != null) {
        vertex = this.fold.vertices_coords[v];
        if (FOLD.geom.dist(vertex, p) < FOLD.geom.dist(closest, p)) {
          closest = vertex;
        }
      }
      return {
        x: closest[0],
        y: closest[1]
      };
    }

    setTitle(title) {
      return this.fold['file_title'] = title;
    }

    setMode(mode) {
      var ref;
      if ((ref = this.mode) != null) {
        ref.exit(this);
      }
      this.mode = mode;
      return this.mode.enter(this);
    }

    setLineType(lineType) {
      this.lineType = lineType;
    }

    setAbsFoldAngle(absFoldAngle) {
      this.absFoldAngle = absFoldAngle;
    }

    getFoldAngle() {
      if (this.lineType === 'V') {
        return this.absFoldAngle;
      } else if (this.lineType === 'M') {
        return -this.absFoldAngle;
      } else {
        return 0;
      }
    }

    escape() {
      var ref;
      return (ref = this.mode) != null ? typeof ref.escape === "function" ? ref.escape(this) : void 0 : void 0;
    }

    addVertex(v) {
      var changedEdges, e, i, j, len;
      [i, changedEdges] = FOLD.filter.addVertexAndSubdivide(this.fold, [v.x, v.y], FOLD.geom.EPS);
      if (i === this.fold.vertices_coords.length - 1) { // new vertex
        this.drawVertex(i);
      }
      for (j = 0, len = changedEdges.length; j < len; j++) {
        e = changedEdges[j];
        this.drawEdge(e);
      }
      return i;
    }

    addCrease(p1, p2, assignment, foldAngle) {
      var changedEdges, e, i, j, k, len, len1, len2, m, n, newVertices, ref, ref1, ref2, ref3, ref4, results1, v;
      p1 = this.addVertex(p1);
      p2 = this.addVertex(p2);
      newVertices = this.fold.vertices_coords.length;
      changedEdges = FOLD.filter.addEdgeAndSubdivide(this.fold, p1, p2, FOLD.geom.EPS);
      ref = changedEdges[0];
      for (j = 0, len = ref.length; j < len; j++) {
        e = ref[j];
        this.fold.edges_assignment[e] = assignment;
        this.fold.edges_foldAngle[e] = foldAngle;
      }
      ref1 = [0, 1];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        i = ref1[k];
        ref2 = changedEdges[i];
        for (m = 0, len2 = ref2.length; m < len2; m++) {
          e = ref2[m];
          this.drawEdge(e);
        }
      }
      results1 = [];
      for (v = n = ref3 = newVertices, ref4 = this.fold.vertices_coords.length; (ref3 <= ref4 ? n < ref4 : n > ref4); v = ref3 <= ref4 ? ++n : --n) {
        results1.push(this.drawVertex(v));
      }
      return results1;
    }

    //console.log @fold
    //@loadFold @fold
    subdivide() {
      FOLD.filter.collapseNearbyVertices(this.fold, FOLD.geom.EPS);
      FOLD.filter.subdivideCrossingEdges_vertices(this.fold, FOLD.geom.EPS);
      return this.loadFold(this.fold);
    }

    saveForUndo() {
      this.undoStack.push(FOLD.convert.deepCopy(this.fold));
      this.redoStack = [];
      return this.updateUndoStack();
    }

    undo() {
      if (!this.undoStack.length) {
        return;
      }
      this.redoStack.push(this.fold);
      this.fold = this.undoStack.pop();
      this.loadFold(this.fold);
      return this.updateUndoStack();
    }

    redo() {
      if (!this.redoStack.length) {
        return;
      }
      this.undoStack.push(this.fold);
      this.fold = this.redoStack.pop();
      this.loadFold(this.fold);
      return this.updateUndoStack();
    }

    updateUndoStack() {
      var ref, ref1;
      if (typeof document !== "undefined" && document !== null) {
        if ((ref = document.getElementById('undo')) != null) {
          ref.disabled = this.undoStack.length === 0;
        }
      }
      return typeof document !== "undefined" && document !== null ? (ref1 = document.getElementById('redo')) != null ? ref1.disabled = this.redoStack.length === 0 : void 0 : void 0;
    }

    transform(matrix, integerize = true) {
      var coords, i, int, integers, ints, j, k, len, len1, v, x;
      /*
      Main transforms we care about (reflection and 90-degree rotation) should
      preserve integrality of coordinates.  Force this when integerize is true.
      */
      this.saveForUndo();
      if (integerize) {
        integers = (function() {
          var j, len, ref, results1;
          ref = this.fold.vertices_coords;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            coords = ref[j];
            results1.push((function() {
              var k, len1, results2;
              results2 = [];
              for (k = 0, len1 = coords.length; k < len1; k++) {
                x = coords[k];
                results2.push(Number.isInteger(x));
              }
              return results2;
            })());
          }
          return results1;
        }).call(this);
      }
      FOLD.filter.transform(this.fold, matrix);
      if (integerize) {
        for (v = j = 0, len = integers.length; j < len; v = ++j) {
          ints = integers[v];
          for (i = k = 0, len1 = ints.length; k < len1; i = ++k) {
            int = ints[i];
            if (int) {
              this.fold.vertices_coords[v][i] = Math.round(this.fold.vertices_coords[v][i]);
            }
          }
        }
      }
      return this.loadFold(this.fold);
    }

    reflectX() {
      var xMax, xMin;
      ({xMin, xMax} = this.fold['cpedit:page']);
      return this.transform(FOLD.geom.matrixReflectAxis(0, 2, (xMin + xMax) / 2));
    }

    reflectY() {
      var yMax, yMin;
      ({yMin, yMax} = this.fold['cpedit:page']);
      return this.transform(FOLD.geom.matrixReflectAxis(1, 2, (yMin + yMax) / 2));
    }

    rotate90(cw) {
      var angle, xMax, xMin, yMax, yMin;
      ({xMin, xMax, yMin, yMax} = this.fold['cpedit:page']);
      if (cw) {
        angle = Math.PI / 2;
      } else {
        angle = -Math.PI / 2;
      }
      return this.transform(FOLD.geom.matrixRotate2D(angle, [(xMin + xMax) / 2, (yMin + yMax) / 2]));
    }

    rotateCW() {
      return this.rotate90(true);
    }

    rotateCCW() {
      return this.rotate90(false);
    }

    translate(dx, dy) {
      return this.transform(FOLD.geom.matrixTranslate([dx, dy]));
    }

    shiftL() {
      return this.translate(-1, 0);
    }

    shiftR() {
      return this.translate(+1, 0);
    }

    shiftU() {
      return this.translate(0, -1);
    }

    shiftD() {
      return this.translate(0, +1);
    }

    loadFold(fold1) {
      var assignment, base, base1, ref, ref1, ref2, ref3, v;
      this.fold = fold1;
      this.fold.version = 1.2;
      if ((ref = this.mode) != null) {
        ref.exit(this);
      }
      this.drawVertices();
      if ((base = this.fold).edges_foldAngle == null) {
        base.edges_foldAngle = (function() {
          var j, len, ref1, results1;
          ref1 = this.fold.edges_assignment;
          results1 = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            assignment = ref1[j];
            switch (assignment) {
              case 'V':
                results1.push(180); // "The fold angle is positive for valley folds,"
                break;
              case 'M':
                results1.push(-180); // "negative for mountain folds, and"
                break;
              default:
                results1.push(0); // "zero for flat, unassigned, and border folds"
            }
          }
          return results1;
        }).call(this);
      }
      this.drawEdges();
      if ((base1 = this.fold)["cpedit:page"] == null) {
        base1["cpedit:page"] = ((ref1 = this.fold.vertices_coords) != null ? ref1.length : void 0) ? {
          xMin: Math.min(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[0]);
            }
            return results1;
          }).call(this))),
          yMin: Math.min(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[1]);
            }
            return results1;
          }).call(this))),
          xMax: Math.max(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[0]);
            }
            return results1;
          }).call(this))),
          yMax: Math.max(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[1]);
            }
            return results1;
          }).call(this)))
        } : defaultPage();
      }
      this.updateGrid();
      if (typeof document !== "undefined" && document !== null) {
        document.getElementById('title').value = (ref2 = this.fold.file_title) != null ? ref2 : '';
      }
      return (ref3 = this.mode) != null ? ref3.enter(this) : void 0;
    }

    drawVertices() {
      var j, ref, results1, v;
      this.vertexGroup.clear();
      results1 = [];
      for (v = j = 0, ref = this.fold.vertices_coords.length; (0 <= ref ? j < ref : j > ref); v = 0 <= ref ? ++j : --j) {
        results1.push(this.drawVertex(v));
      }
      return results1;
    }

    drawEdges() {
      var e, j, ref, results1;
      this.creaseGroup.clear();
      results1 = [];
      for (e = j = 0, ref = this.fold.edges_vertices.length; (0 <= ref ? j < ref : j > ref); e = 0 <= ref ? ++j : --j) {
        results1.push(this.drawEdge(e));
      }
      return results1;
    }

    drawVertex(v) {
      var ref;
      if ((ref = this.vertexCircle[v]) != null) {
        ref.remove();
      }
      return this.vertexCircle[v] = this.vertexGroup.circle(0.2).center(...this.fold.vertices_coords[v]).attr('data-index', v);
    }

    drawEdge(e) {
      var coords, l, ref, v;
      if ((ref = this.creaseLine[e]) != null) {
        ref.remove();
      }
      coords = (function() {
        var j, len, ref1, results1;
        ref1 = this.fold.edges_vertices[e];
        results1 = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          v = ref1[j];
          results1.push(this.fold.vertices_coords[v]);
        }
        return results1;
      }).call(this);
      return this.creaseLine[e] = l = this.creaseGroup.line(coords[0][0], coords[0][1], coords[1][0], coords[1][1]).addClass(this.fold.edges_assignment[e]).attr('stroke-opacity', foldAngleToOpacity(this.fold.edges_foldAngle[e], this.fold.edges_assignment[e])).attr('data-index', e);
    }

    cleanup() {
      var coords, edge, edges, i, j, k, len, m, otherV, ref, ref1, v, vectors, vertex, vertices;
      // Check for vertices of degree 0, or of degree 2
      // where the two incident edges are parallel.
      // Consider vertices in decreasing order so that indices don't change.
      FOLD.convert.edges_vertices_to_vertices_edges_unsorted(this.fold);
      for (v = j = ref = this.fold.vertices_coords.length - 1; (ref <= 0 ? j <= 0 : j >= 0); v = ref <= 0 ? ++j : --j) {
        if (this.fold.vertices_edges[v].length === 0) {
          FOLD.filter.removeVertex(this.fold, v);
        } else if (this.fold.vertices_edges[v].length === 2) {
          edges = this.fold.vertices_edges[v];
          vectors = (function() {
            var k, len, results1;
            results1 = [];
            for (k = 0, len = edges.length; k < len; k++) {
              edge = edges[k];
              vertices = this.fold.edges_vertices[edge];
              coords = (function() {
                var len1, m, results2;
                results2 = [];
                for (m = 0, len1 = vertices.length; m < len1; m++) {
                  vertex = vertices[m];
                  results2.push(this.fold.vertices_coords[vertex]);
                }
                return results2;
              }).call(this);
              results1.push(FOLD.geom.mul(FOLD.geom.unit(FOLD.geom.sub(coords[0], coords[1])), vertices[0] === v ? 1 : -1));
            }
            return results1;
          }).call(this);
          if ((FOLD.geom.dot(vectors[0], vectors[1])) <= -1 + FOLD.geom.EPS) {
            ref1 = this.fold.edges_vertices[edges[1]];
            for (k = 0, len = ref1.length; k < len; k++) {
              otherV = ref1[k];
              if (v !== otherV) {
                break;
              }
            }
            vertices = this.fold.edges_vertices[edges[0]];
            for (i = m = 0; m < 2; i = ++m) {
              if (vertices[i] === v) {
                vertices[i] = otherV;
              }
            }
            FOLD.filter.removeEdge(this.fold, edges[1]);
            FOLD.filter.removeVertex(this.fold, v);
            FOLD.convert.edges_vertices_to_vertices_edges_unsorted(this.fold);
          }
        }
      }
      delete this.fold.vertices_edges;
      this.drawVertices();
      return this.drawEdges();
    }

    convertToFold(splitCuts, json = true) {
      var c, fold;
      //# Add face structure to @fold
      fold = FOLD.convert.deepCopy(this.fold);
      FOLD.convert.edges_vertices_to_vertices_edges_sorted(fold);
      fold.frame_classes = (function() {
        var j, len, ref, ref1, results1;
        ref1 = (ref = fold.frame_classes) != null ? ref : [];
        results1 = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          c = ref1[j];
          if (c !== 'cuts' && c !== 'noCuts') {
            results1.push(c);
          }
        }
        return results1;
      })();
      if (!FOLD.filter.cutEdges(fold).length) {
        fold.frame_classes.push('noCuts');
      } else if (splitCuts) {
        fold.frame_classes.push('noCuts');
        FOLD.filter.splitCuts(fold);
      } else {
        //console.log 'cut', fold
        fold.frame_classes.push('cuts');
      }
      FOLD.convert.vertices_edges_to_faces_vertices_edges(fold);
      if (json) {
        //console.log fold
        fold = FOLD.convert.toJSON(fold);
      }
      return fold;
    }

    downloadFold() {
      //json = FOLD.convert.toJSON @fold  # minimal content
      return this.download(this.convertToFold(false), 'application/json', '.fold');
    }

    downloadSplitFold() {
      return this.download(this.convertToFold(true), 'application/json', '-split.fold');
    }

    convertToSVG(options) {
      var svg;
      svg = this.svg.clone();
      svg.find('.C').front();
      svg.find('.B').front();
      svg.find('.B').stroke({
        color: '#000000'
      });
      if (options != null ? options.nice : void 0) {
        //# Cuts look the same as boundary, and are very thick (0.2).
        svg.find('.B, .C').stroke({
          width: 0.2
        });
        svg.find('.C').stroke({
          color: '#000000'
        });
        //# Nice blue/red, even in grayscale
        svg.find('.M').stroke({
          color: '#ff6060'
        });
        svg.find('.V').stroke({
          color: '#385dcf'
        });
        //# Instead of opacity, use thickness for bigger folds.
        //# 90 degrees has thickness 0.1, while 180 degrees has thickness 0.15.
        svg.find('.M, .V, .B, .C').each(function() {
          var t;
          t = this.attr('stroke-opacity');
          this.stroke({
            width: (1 - t) * 0.05 + t * 0.15
          });
          return this.attr('stroke-opacity', 1);
        });
      } else {
        svg.find('.M, .V, .B, .C').stroke({
          width: 0.1
        });
        svg.find('.C').stroke({
          color: '#00ff00'
        });
        svg.find('.M').stroke({
          color: '#ff0000'
        });
        svg.find('.V').stroke({
          color: '#0000ff'
        });
      }
      if (!(options != null ? options.noUnfold : void 0)) {
        svg.find('.U').stroke({
          color: '#ffff00',
          width: 0.1
        });
      }
      svg.find('.vertex, .drag').remove();
      if (options != null ? options.grid : void 0) {
        svg.find('.grid').stroke({
          color: '#dddddd',
          width: 0.05
        });
      } else {
        svg.find('.grid').remove();
      }
      svg.attr('width', `${this.svg.viewbox().width}cm`);
      svg.attr('height', `${this.svg.viewbox().height}cm`);
      svg.element('style').words(`line { stroke-linecap: round; }`);
      return svg.svg().replace(/[ ]id="[^"]+"/g, '');
    }

    downloadSVG() {
      return this.download(this.convertToSVG(), 'image/svg+xml', '.svg');
    }

    download(content, type, extension) {
      var a, url;
      a = document.getElementById('download');
      a.href = url = URL.createObjectURL(new Blob([content], {type}));
      a.download = (this.fold.file_title || 'creasepattern') + extension;
      a.click();
      a.href = '';
      return URL.revokeObjectURL(url);
    }

  };

  Mode = class Mode {};

  LineDrawMode = class LineDrawMode extends Mode {
    enter(editor) {
      var move, svg;
      svg = editor.svg;
      this.which = 0; //# 0 = first point, 1 = second point
      this.points = {};
      this.circles = [];
      this.crease = this.line = null;
      this.dragging = false;
      svg.mousemove(move = (e) => {
        var point;
        point = editor.nearestFeature(svg.point(e.clientX, e.clientY));
        //# Wait for distance threshold in drag before triggering drag
        if (e.buttons) {
          if (this.down != null) {
            if (!(point.x === this.down.x && point.y === this.down.y)) {
              this.dragging = true;
              this.which = 1;
            }
          } else if (this.down === null) {
            this.down = point;
          }
        }
        this.points[this.which] = point;
        if (!(this.which < this.circles.length)) {
          this.circles.push(editor.dragGroup.circle(0.3));
        }
        this.circles[this.which].center(this.points[this.which].x, this.points[this.which].y);
        if (this.which === 1) {
          if (this.line == null) {
            this.line = editor.dragGroup.line().addClass('drag');
          }
          if (this.crease == null) {
            this.crease = editor.dragGroup.line().addClass(editor.lineType).attr('stroke-opacity', foldAngleToOpacity(editor.getFoldAngle(), editor.lineType));
          }
          this.line.plot(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
          return this.crease.plot(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
        }
      });
      svg.mousedown((e) => {
        this.down = null; // special value meaning 'set'
        return move(e);
      });
      svg.mouseup((e) => {
        move(e);
        //# Click, click style line drawing: advance to second point if not
        //# currently in drag mode, and didn't just @escape (no "down" point).
        if (this.which === 0 && !this.dragging && this.down !== void 0) {
          return this.which = 1;
        } else {
          //# Commit new crease, unless it's zero length.
          if (!(this.which === 0 || (this.points[0].x === this.points[1].x && this.points[0].y === this.points[1].y))) {
            editor.saveForUndo();
            editor.addCrease(this.points[0], this.points[1], editor.lineType, editor.getFoldAngle());
          }
          this.escape(editor);
          return move(e);
        }
      });
      svg.mouseenter((e) => {
        if (this.dragging && e.buttons === 0) {
          //# Cancel crease if user exits, lets go of button, and re-enters
          this.escape(editor);
        }
        return move(e);
      });
      return svg.mouseleave((e) => {
        if (this.circles.length === this.which + 1) {
          return this.circles.pop().remove();
        }
      });
    }

    escape(editor) {
      var ref, ref1;
      while (this.circles.length) {
        this.circles.pop().remove();
      }
      if ((ref = this.crease) != null) {
        ref.remove();
      }
      if ((ref1 = this.line) != null) {
        ref1.remove();
      }
      this.crease = this.line = null;
      this.which = 0;
      this.dragging = false;
      return this.down = void 0;
    }

    exit(editor) {
      this.escape(editor);
      return editor.svg.mousemove(null).mousedown(null).mouseup(null).mouseenter(null).mouseleave(null);
    }

  };

  LinePaintMode = class LinePaintMode extends Mode {
    enter(editor) {
      var change, svg;
      svg = editor.svg;
      svg.mousedown(change = (e) => {
        var edge;
        if (!e.buttons) {
          return;
        }
        if (e.target.tagName !== 'line') {
          return;
        }
        edge = parseInt(e.target.getAttribute('data-index'));
        if (isNaN(edge)) {
          return;
        }
        return this.paint(editor, edge);
      });
      return svg.mouseover(change); // painting
    }

    exit(editor) {
      return editor.svg.mousedown(null).mouseover(null);
    }

  };

  LineAssignMode = class LineAssignMode extends LinePaintMode {
    paint(editor, edge) {
      if (!(editor.fold.edges_assignment[edge] === editor.lineType && editor.fold.edges_foldAngle[edge] === editor.getFoldAngle())) {
        editor.saveForUndo();
        editor.fold.edges_assignment[edge] = editor.lineType;
        editor.fold.edges_foldAngle[edge] = editor.getFoldAngle();
        return editor.drawEdge(edge);
      }
    }

  };

  LineEraseMode = class LineEraseMode extends LinePaintMode {
    paint(editor, edge) {
      var edgeVertices, incident, j, k, len, len1, len2, m, ref, results1, vertex, vertices;
      editor.saveForUndo();
      vertices = editor.fold.edges_vertices[edge];
      FOLD.filter.removeEdge(editor.fold, edge);
      editor.drawEdges();
      // Remove any now-isolated vertices
      incident = {};
      ref = editor.fold.edges_vertices;
      for (j = 0, len = ref.length; j < len; j++) {
        edgeVertices = ref[j];
        for (k = 0, len1 = edgeVertices.length; k < len1; k++) {
          vertex = edgeVertices[k];
          incident[vertex] = true;
        }
      }
      // Remove vertices in decreasing order so that indices don't change
      if (vertices[0] < vertices[1]) {
        vertices = [vertices[1], vertices[0]];
      }
      results1 = [];
      for (m = 0, len2 = vertices.length; m < len2; m++) {
        vertex = vertices[m];
        if (!incident[vertex]) {
          FOLD.filter.removeVertex(editor.fold, vertex);
          results1.push(editor.drawVertices()); // might get called twice
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    }

  };

  VertexMoveMode = class VertexMoveMode extends Mode {
    enter(editor) {
      var move, svg;
      svg = editor.svg;
      svg.mousemove(move = (e) => {
        this.point = editor.nearestFeature(svg.point(e.clientX, e.clientY));
        if (this.vertex != null) {
          return this.drag(editor);
        }
      });
      svg.mousedown((e) => {
        this.vertex = parseInt(e.target.getAttribute('data-index'));
        if (e.target.tagName === 'circle' && (this.vertex != null)) {
          this.circle = e.target.instance.addClass('drag');
          this.down = null; // special value meaning 'set'
          return move(e);
        } else {
          return this.circle = this.vertex = null;
        }
      });
      svg.mouseup((e) => {
        move(e);
        if (this.vertex != null) {
          //# Commit new location
          if (!(this.point.x === editor.fold.vertices_coords[this.vertex][0] && this.point.y === editor.fold.vertices_coords[this.vertex][1])) {
            editor.saveForUndo();
            editor.fold.vertices_coords[this.vertex][0] = this.point.x;
            editor.fold.vertices_coords[this.vertex][1] = this.point.y;
            this.vertex = null;
            editor.subdivide();
          }
          //editor.drawVertex @vertex
          //for vertices, edge in editor.fold.edges_vertices
          //  editor.drawEdge edge if @vertex in vertices
          return this.escape(editor);
        }
      });
      svg.mouseover((e) => {
        var index;
        if (this.vertex != null) {
          return;
        }
        if (!(e.target.tagName === 'circle' && (index = e.target.getAttribute('data-index')))) {
          return;
        }
        return e.target.instance.addClass('drag');
      });
      return svg.mouseout((e) => {
        if (!(e.target.tagName === 'circle' && e.target.getAttribute('data-index'))) {
          return;
        }
        if (this.vertex === parseInt(e.target.getAttribute('data-index'))) {
          return;
        }
        return e.target.instance.removeClass('drag');
      });
    }

    //svg.mouseenter (e) =>
    //  ## Cancel crease if user exits, lets go of button, and re-enters
    //  @escape editor if @dragging and e.buttons == 0
    //  move e
    //svg.mouseleave (e) =>
    //  if @circles.length == @which + 1
    //    @circles.pop().remove()
    escape(editor) {
      if (this.vertex != null) {
        this.circle.removeClass('drag');
        this.point = {
          x: editor.fold.vertices_coords[this.vertex][0],
          y: editor.fold.vertices_coords[this.vertex][1]
        };
        this.drag(editor);
      }
      return this.circle = this.vertex = null;
    }

    exit(editor) {
      this.escape(editor);
      editor.svg.find('.vertex circle.drag').removeClass('drag');
      return editor.svg.mousemove(null).mousedown(null).mouseup(null).mouseenter(null).mouseleave(null);
    }

    drag(editor) {
      var point, vertex;
      this.circle.center(this.point.x, this.point.y);
      vertex = this.vertex;
      point = this.point;
      return editor.svg.find('.crease line').each(function() {
        var edge, i;
        edge = this.attr('data-index');
        i = editor.fold.edges_vertices[edge].indexOf(vertex);
        if (i >= 0) {
          this.attr(`x${i + 1}`, point.x);
          return this.attr(`y${i + 1}`, point.y);
        }
      });
    }

  };

  modes = {
    drawLine: new LineDrawMode(),
    assignLine: new LineAssignMode(),
    eraseLine: new LineEraseMode(),
    moveVertex: new VertexMoveMode()
  };

  if (typeof window !== "undefined" && window !== null) {
    window.onload = function() {
      var amt, angle, angleInput, checkReady, delta, dim, editor, id, input, j, k, len, len1, len2, len3, len4, len5, m, n, o, onReady, op, q, ready, ref, ref1, ref2, ref3, ref4, ref5, setAngle, sign, simulator, size, svg;
      svg = SVG().addTo('#interface');
      editor = new Editor(svg);
      ref = document.getElementsByTagName('input');
      for (j = 0, len = ref.length; j < len; j++) {
        input = ref[j];
        (function(input) {
          switch (input.getAttribute('name')) {
            case 'mode':
              if (input.checked) {
                editor.setMode(modes[input.id]);
              }
              input.addEventListener('change', function(e) {
                if (!input.checked) {
                  return;
                }
                if (input.id in modes) {
                  return editor.setMode(modes[input.id]);
                } else {
                  return console.warn(`Unrecognized mode ${input.id}`);
                }
              });
              break;
            case 'line':
              if (input.checked) {
                editor.setLineType(input.value);
              }
              input.addEventListener('change', function(e) {
                if (!input.checked) {
                  return;
                }
                return editor.setLineType(input.value);
              });
          }
          return input.parentElement.addEventListener('click', function(e) {
            var ref1;
            if (!(e.target === input || ((ref1 = e.target.tagName) === 'LABEL' || ref1 === 'INPUT' || ref1 === 'A'))) {
              return input.click();
            }
          });
        })(input);
      }
      window.addEventListener('keyup', (e) => {
        switch (e.key) {
          case 'd':
          case 'D':
            return document.getElementById('drawLine').click();
          case 'a':
          case 'A':
            return document.getElementById('assignLine').click();
          case 'e':
          case 'E':
            return document.getElementById('eraseLine').click();
          case 'm':
            return document.getElementById('moveVertex').click();
          case 'b':
          case 'B':
            return document.getElementById('boundary').click();
          case 'M':
            return document.getElementById('mountain').click();
          case 'V':
            return document.getElementById('valley').click();
          case 'u':
          case 'U':
            return document.getElementById('unfolded').click();
          case 'c':
          case 'C':
            return document.getElementById('cut').click();
          case 'Escape':
            return editor.escape();
          case 'z':
            return editor.undo();
          case 'y':
          case 'Z':
            return editor.redo();
        }
      });
      ref1 = ['cleanup', 'undo', 'redo', 'reflectX', 'reflectY', 'rotateCCW', 'rotateCW', 'shiftL', 'shiftD', 'shiftU', 'shiftR'];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        id = ref1[k];
        (function(id) {
          return document.getElementById(id).addEventListener('click', function(e) {
            e.stopPropagation();
            return editor[id]();
          });
        })(id);
      }
      document.getElementById('loadFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return document.getElementById('fileFold').click();
      });
      document.getElementById('fileFold').addEventListener('input', function(e) {
        var file, reader;
        e.stopPropagation();
        if (!e.target.files.length) {
          return;
        }
        file = e.target.files[0];
        reader = new FileReader();
        reader.onload = function() {
          return editor.loadFold(JSON.parse(reader.result));
        };
        return reader.readAsText(file);
      });
      document.getElementById('downloadFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return editor.downloadFold();
      });
      document.getElementById('downloadSplitFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return editor.downloadSplitFold();
      });
      document.getElementById('downloadSVG').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return editor.downloadSVG();
      });
      ref2 = [['width', 'x'], ['height', 'y']];
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        [size, dim] = ref2[m];
        ref3 = [[-1, 'Dec'], [+1, 'Inc']];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          [delta, op] = ref3[n];
          (function(size, dim, delta, op) {
            return document.getElementById(size + op).addEventListener('click', function(e) {
              e.stopPropagation();
              editor.saveForUndo();
              editor.fold["cpedit:page"][dim + 'Max'] += delta;
              return editor.updateGrid();
            });
          })(size, dim, delta, op);
        }
      }
      document.getElementById('title').addEventListener('input', function(e) {
        return editor.setTitle(document.getElementById('title').value);
      });
      //# Fold angle
      angleInput = document.getElementById('angle');
      angle = null;
      setAngle = function(value) {
        if (typeof value !== 'number') {
          return;
        }
        if (isNaN(value)) {
          return;
        }
        angle = value;
        angle = Math.max(angle, 0);
        angle = Math.min(angle, 180);
        angleInput.value = angle;
        return editor.setAbsFoldAngle(angle);
      };
      setAngle(parseFloat(angleInput.value)); // initial value
      angleInput.addEventListener('change', function(e) {
        return setAngle(eval(angleInput.value)); // allow formulas via eval
      });
      ref4 = [[+1, 'Add'], [-1, 'Sub']];
      for (o = 0, len4 = ref4.length; o < len4; o++) {
        [sign, op] = ref4[o];
        ref5 = [1, 90];
        for (q = 0, len5 = ref5.length; q < len5; q++) {
          amt = ref5[q];
          document.getElementById(`angle${op}${amt}`).addEventListener('click', (function(sign, amt) {
            return function(e) {
              return setAngle(angle + sign * amt);
            };
          })(sign, amt));
        }
      }
      //# Origami Simulator
      simulator = null;
      ready = false;
      onReady = null;
      checkReady = function() {
        if (ready) {
          if (typeof onReady === "function") {
            onReady();
          }
          return onReady = null;
        }
      };
      window.addEventListener('message', function(e) {
        if (e.data && e.data.from === 'OrigamiSimulator' && e.data.status === 'ready') {
          ready = true;
          return checkReady();
        }
      });
      return document.getElementById('simulate').addEventListener('click', function(e) {
        var assignment, fold;
        if ((simulator != null) && !simulator.closed) {
          simulator.focus();
        } else {
          ready = false;
          //simulator = window.open 'OrigamiSimulator/?model=', 'simulator'
          simulator = window.open('https://origamisimulator.org/?model=', 'simulator');
          // var relativeUrl = "../OrigamiSimulator/index.html";
          // var absoluteUrl = new URL(relativeUrl, window.location.href).href;
          // simulator = window.open(relativeUrl, "simulator");
        }
        fold = editor.convertToFold(true, false); // split cuts, no JSON
        //# Origami Simulator wants 'F' for unfolded (facet) creases;
        //# it uses 'U' for undriven creases. :-/
        fold.edges_assignment = (function() {
          var len6, r, ref6, results1;
          ref6 = fold.edges_assignment;
          results1 = [];
          for (r = 0, len6 = ref6.length; r < len6; r++) {
            assignment = ref6[r];
            if (assignment === 'U') {
              results1.push('F');
            } else {
              results1.push(assignment);
            }
          }
          return results1;
        })();
        onReady = function() {
          return simulator.postMessage({
            op: 'importFold',
            fold: fold
          }, '*');
        };
        return checkReady();
      });
    };
  }

  //# CLI

    //# VDOM simulation of used subset of svg.js interface
  VSVG = class VSVG {
    constructor(tag1, parent) {
      this.tag = tag1;
      this.parent = parent;
      this.classes = new Set();
      this.attrs = new Map();
      this.children = [];
    }

    svg() {
      var c, child, key, ref, s, value, z;
      s = '';
      if (this.tag === 'svg') {
        s += `<?xml version="1.0" encoding="utf-8"?>
`;
        this.attrs.set('xmlns', 'http://www.w3.org/2000/svg');
      }
      if (this.classes.size) {
        this.attrs.set('class', ((function() {
          var ref, results1;
          ref = this.classes;
          results1 = [];
          for (c of ref) {
            results1.push(c);
          }
          return results1;
        }).call(this)).join(' '));
      } else {
        this.attrs.delete('class');
      }
      s += `<${this.tag}`;
      ref = this.attrs;
      for (z of ref) {
        [key, value] = z;
        s += ` ${key}=\"${value}\"`;
      }
      if (this.innerHTML) {
        return s + ">\n" + this.innerHTML + `\n</${this.tag}>`;
      } else if (this.children.length) {
        return s + ">\n" + ((function() {
          var j, len, ref1, results1;
          ref1 = this.children;
          results1 = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (!child.removed) {
              results1.push(child.svg());
            }
          }
          return results1;
        }).call(this)).join("\n") + `\n</${this.tag}>`;
      } else {
        return s + "/>";
      }
    }

    remove() {
      this.removed = true;
      return this;
    }

    clear() {
      var child, j, len, ref;
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.parent = void 0;
      }
      this.children = [];
      return this;
    }

    attr(key, value) {
      if (value != null) {
        this.attrs.set(key, value);
        return this;
      } else {
        return this.attrs.get(key); // setter
      }
    }

    viewbox(x, y, width, height) {
      var coords;
      if (x != null) {
        return this.attr('viewBox', `${x} ${y} ${width} ${height}`);
      } else {
        coords = this.attr('viewBox').split(/\s+/).map(parseFloat);
        return {
          x: coords[0],
          y: coords[1],
          width: coords[2],
          height: coords[3]
        }; // setter
      }
    }

    addClass(c) {
      this.classes.add(c);
      return this;
    }

    group() {
      var child;
      this.children.push(child = new VSVG('g', this));
      return child;
    }

    line(x1, y1, x2, y2) {
      var child;
      this.children.push(child = new VSVG('line', this));
      return child.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);
    }

    stroke({color, width}) {
      if (color != null) {
        this.attr('stroke', color);
      }
      if (width != null) {
        this.attr('stroke-width', width);
      }
      return this;
    }

    circle(diameter) {
      var child;
      this.children.push(child = new VSVG('circle', this));
      return child.attr('r', diameter / 2);
    }

    center(x, y) {
      console.assert(this.tag === 'circle');
      return this.attr('cx', x).attr('cy', y);
    }

    front() {
      var i;
      i = this.parent.children.indexOf(this);
      console.assert(i >= 0);
      this.parent.children.splice(i, 1);
      this.parent.children.push(this);
      return this;
    }

    element(tag) {
      var child;
      this.children.push(child = new VSVG(tag, this));
      return child;
    }

    words(child) {
      this.innerHTML = child;
      return this;
    }

    clone() {
      return this;
    }

    find(pattern) {
      var classes, j, len, match, part, recurse, ref, results, shortcut;
      classes = (function() {
        var j, len, ref, results1;
        ref = pattern.split(/\s*,\s*/);
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          part = ref[j];
          match = part.match(/^\.([^.]+)$/);
          if (match == null) {
            throw new Error(`Bad select pattern '${part}'`);
          }
          results1.push(match[1]);
        }
        return results1;
      })();
      results = [];
      results.each = function(f) {
        var j, len, node, ref, results1;
        ref = this;
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          results1.push(f.call(node));
        }
        return results1;
      };
      ref = ['stroke', 'remove', 'front'];
      for (j = 0, len = ref.length; j < len; j++) {
        shortcut = ref[j];
        (function(shortcut) {
          return results[shortcut] = function(...args) {
            var k, len1, node, results1;
            results1 = [];
            for (k = 0, len1 = results.length; k < len1; k++) {
              node = results[k];
              results1.push(node[shortcut](...args));
            }
            return results1;
          };
        })(shortcut);
      }
      recurse = function(node) {
        var child, class_, k, len1, len2, m, ref1;
        match = false;
        for (k = 0, len1 = classes.length; k < len1; k++) {
          class_ = classes[k];
          if (node.classes.has(class_)) {
            match = true;
            break;
          }
        }
        if (match) {
          results.push(node);
        }
        ref1 = node.children;
        for (m = 0, len2 = ref1.length; m < len2; m++) {
          child = ref1[m];
          if (!child.removed) {
            recurse(child);
          }
        }
      };
      recurse(this);
      return results;
    }

  };

  cli = function(args = process.argv.slice(2)) {
    var arg, cleanup, cpData, cpFile, cpFiles, editor, format, formats, fs, j, k, len, len1, options, output, outputPath, results1;
    fs = require('fs');
    if (!args.length) {
      console.log(`Usage: coffee cpedit.coffee [formats/options] file1.fold file2.fold ...
Formats:
  -s/--svg   .svg
  -f/--fold  .fold
Options:
  -c/--cleanup    Remove unnecessary degree-0 and -2 vertices
  -g/--grid       Keep grid lines
  -u/--no-unfold  Don't color unfolded creases yellow
  -n/--nice       Nice colors instead of pure RGB for Origami Simulator`);
    }
    formats = [];
    cpFiles = [];
    cleanup = false;
    options = {};
    for (j = 0, len = args.length; j < len; j++) {
      arg = args[j];
      switch (arg) {
        case '-c':
        case '--clean':
        case '--cleanup':
          cleanup = true;
          break;
        case '-s':
        case '--svg':
          formats.push('SVG');
          break;
        case '-f':
        case '--fold':
          formats.push('Fold');
          break;
        case '-u':
        case '--no-unfold':
          options.noUnfold = true;
          break;
        case '-g':
        case '--grid':
          options.grid = true;
          break;
        case '-n':
        case '--nice':
          options.nice = true;
          break;
        default:
          if (arg.startsWith('-')) {
            console.log(`Unknown option: ${arg}`);
            continue;
          }
          cpFiles.push(arg);
      }
    }
    results1 = [];
    for (k = 0, len1 = cpFiles.length; k < len1; k++) {
      cpFile = cpFiles[k];
      editor = new Editor(new VSVG('svg'));
      cpData = JSON.parse(fs.readFileSync(cpFile, {
        encoding: 'utf8'
      }));
      editor.loadFold(cpData);
      if (cleanup) {
        editor.cleanup();
      }
      results1.push((function() {
        var len2, m, results2;
        results2 = [];
        for (m = 0, len2 = formats.length; m < len2; m++) {
          format = formats[m];
          output = editor[`convertTo${format}`](options);
          outputPath = cpFile.replace(/(\.(fold|cp))?$/, `.${format.toLowerCase()}`);
          results2.push(fs.writeFileSync(outputPath, output, {
            encoding: 'utf8'
          }));
        }
        return results2;
      })());
    }
    return results1;
  };

  if ((typeof module !== "undefined" && module !== null) && (typeof require !== "undefined" && require !== null ? require.main : void 0) === module) {
    cli();
  }

}).call(this);
