const $root = flatbuffers.get('tflite');

$root.tflite = $root.tflite || {};

$root.tflite.TensorType = {
    FLOAT32: 0,
    FLOAT16: 1,
    INT32: 2,
    UINT8: 3,
    INT64: 4,
    STRING: 5,
    BOOL: 6,
    INT16: 7,
    COMPLEX64: 8,
    INT8: 9,
    FLOAT64: 10,
    COMPLEX128: 11
};

$root.tflite.CustomQuantization = class CustomQuantization {

    static decode(reader, position) {
        const $ = new $root.tflite.CustomQuantization();
        let offset;
        offset = reader.offset(position, 4);
        $.custom = offset ? new Uint8Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.QuantizationDetails = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.tflite.CustomQuantization.decode(reader, position);
        }
        return undefined;
    }
};

$root.tflite.QuantizationParameters = class QuantizationParameters {

    static decode(reader, position) {
        const $ = new $root.tflite.QuantizationParameters();
        let offset;
        offset = reader.offset(position, 4);
        $.min = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.max = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 8);
        $.scale = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 10);
        // TODO [int64]
        $.zero_point= undefined;
        offset = reader.offset(position, 12);
        const $type$details= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 14);
        $.details = offset ? $root.tflite.QuantizationDetails.decode(reader, position + offset, $type$details) : null;
        offset = reader.offset(position, 16);
        $.quantized_dimension = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.DimensionType = {
    DENSE: 0,
    SPARSE_CSR: 1
};

$root.tflite.Int32Vector = class Int32Vector {

    static decode(reader, position) {
        const $ = new $root.tflite.Int32Vector();
        let offset;
        offset = reader.offset(position, 4);
        $.values = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.Uint16Vector = class Uint16Vector {

    static decode(reader, position) {
        const $ = new $root.tflite.Uint16Vector();
        let offset;
        offset = reader.offset(position, 4);
        $.values = offset ? new Uint16Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.Uint8Vector = class Uint8Vector {

    static decode(reader, position) {
        const $ = new $root.tflite.Uint8Vector();
        let offset;
        offset = reader.offset(position, 4);
        $.values = offset ? new Uint8Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.SparseIndexVector = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.tflite.Int32Vector.decode(reader, position);
            case 2: return $root.tflite.Uint16Vector.decode(reader, position);
            case 3: return $root.tflite.Uint8Vector.decode(reader, position);
        }
        return undefined;
    }
};

$root.tflite.DimensionMetadata = class DimensionMetadata {

    static decode(reader, position) {
        const $ = new $root.tflite.DimensionMetadata();
        let offset;
        offset = reader.offset(position, 4);
        $.format = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.dense_size = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        const $type$array_segments= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.array_segments = offset ? $root.tflite.SparseIndexVector.decode(reader, position + offset, $type$array_segments) : null;
        offset = reader.offset(position, 12);
        const $type$array_indices= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 14);
        $.array_indices = offset ? $root.tflite.SparseIndexVector.decode(reader, position + offset, $type$array_indices) : null;
        return $;
    }
};

$root.tflite.SparsityParameters = class SparsityParameters {

    static decode(reader, position) {
        const $ = new $root.tflite.SparsityParameters();
        let offset;
        offset = reader.offset(position, 4);
        $.traversal_order = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.block_map = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 8);
        $.dim_metadata = reader.array(offset, position, $root.tflite.DimensionMetadata.decode);
        return $;
    }
};

$root.tflite.Tensor = class Tensor {

    static decode(reader, position) {
        const $ = new $root.tflite.Tensor();
        let offset;
        offset = reader.offset(position, 4);
        $.shape = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.type = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.buffer = offset ? reader.uint32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 12);
        // TODO Table
        $.quantization= undefined;
        offset = reader.offset(position, 14);
        $.is_variable = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 16);
        // TODO Table
        $.sparsity= undefined;
        offset = reader.offset(position, 18);
        $.shape_signature = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.BuiltinOperator = {
    ADD: 0,
    AVERAGE_POOL_2D: 1,
    CONCATENATION: 2,
    CONV_2D: 3,
    DEPTHWISE_CONV_2D: 4,
    DEPTH_TO_SPACE: 5,
    DEQUANTIZE: 6,
    EMBEDDING_LOOKUP: 7,
    FLOOR: 8,
    FULLY_CONNECTED: 9,
    HASHTABLE_LOOKUP: 10,
    L2_NORMALIZATION: 11,
    L2_POOL_2D: 12,
    LOCAL_RESPONSE_NORMALIZATION: 13,
    LOGISTIC: 14,
    LSH_PROJECTION: 15,
    LSTM: 16,
    MAX_POOL_2D: 17,
    MUL: 18,
    RELU: 19,
    RELU_N1_TO_1: 20,
    RELU6: 21,
    RESHAPE: 22,
    RESIZE_BILINEAR: 23,
    RNN: 24,
    SOFTMAX: 25,
    SPACE_TO_DEPTH: 26,
    SVDF: 27,
    TANH: 28,
    CONCAT_EMBEDDINGS: 29,
    SKIP_GRAM: 30,
    CALL: 31,
    CUSTOM: 32,
    EMBEDDING_LOOKUP_SPARSE: 33,
    PAD: 34,
    UNIDIRECTIONAL_SEQUENCE_RNN: 35,
    GATHER: 36,
    BATCH_TO_SPACE_ND: 37,
    SPACE_TO_BATCH_ND: 38,
    TRANSPOSE: 39,
    MEAN: 40,
    SUB: 41,
    DIV: 42,
    SQUEEZE: 43,
    UNIDIRECTIONAL_SEQUENCE_LSTM: 44,
    STRIDED_SLICE: 45,
    BIDIRECTIONAL_SEQUENCE_RNN: 46,
    EXP: 47,
    TOPK_V2: 48,
    SPLIT: 49,
    LOG_SOFTMAX: 50,
    DELEGATE: 51,
    BIDIRECTIONAL_SEQUENCE_LSTM: 52,
    CAST: 53,
    PRELU: 54,
    MAXIMUM: 55,
    ARG_MAX: 56,
    MINIMUM: 57,
    LESS: 58,
    NEG: 59,
    PADV2: 60,
    GREATER: 61,
    GREATER_EQUAL: 62,
    LESS_EQUAL: 63,
    SELECT: 64,
    SLICE: 65,
    SIN: 66,
    TRANSPOSE_CONV: 67,
    SPARSE_TO_DENSE: 68,
    TILE: 69,
    EXPAND_DIMS: 70,
    EQUAL: 71,
    NOT_EQUAL: 72,
    LOG: 73,
    SUM: 74,
    SQRT: 75,
    RSQRT: 76,
    SHAPE: 77,
    POW: 78,
    ARG_MIN: 79,
    FAKE_QUANT: 80,
    REDUCE_PROD: 81,
    REDUCE_MAX: 82,
    PACK: 83,
    LOGICAL_OR: 84,
    ONE_HOT: 85,
    LOGICAL_AND: 86,
    LOGICAL_NOT: 87,
    UNPACK: 88,
    REDUCE_MIN: 89,
    FLOOR_DIV: 90,
    REDUCE_ANY: 91,
    SQUARE: 92,
    ZEROS_LIKE: 93,
    FILL: 94,
    FLOOR_MOD: 95,
    RANGE: 96,
    RESIZE_NEAREST_NEIGHBOR: 97,
    LEAKY_RELU: 98,
    SQUARED_DIFFERENCE: 99,
    MIRROR_PAD: 100,
    ABS: 101,
    SPLIT_V: 102,
    UNIQUE: 103,
    CEIL: 104,
    REVERSE_V2: 105,
    ADD_N: 106,
    GATHER_ND: 107,
    COS: 108,
    WHERE: 109,
    RANK: 110,
    ELU: 111,
    REVERSE_SEQUENCE: 112,
    MATRIX_DIAG: 113,
    QUANTIZE: 114,
    MATRIX_SET_DIAG: 115,
    ROUND: 116,
    HARD_SWISH: 117,
    IF: 118,
    WHILE: 119,
    NON_MAX_SUPPRESSION_V4: 120,
    NON_MAX_SUPPRESSION_V5: 121,
    SCATTER_ND: 122,
    SELECT_V2: 123,
    DENSIFY: 124,
    SEGMENT_SUM: 125,
    BATCH_MATMUL: 126
};

$root.tflite.BuiltinOptions = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.tflite.Conv2DOptions.decode(reader, position);
            case 2: return $root.tflite.DepthwiseConv2DOptions.decode(reader, position);
            case 3: return $root.tflite.ConcatEmbeddingsOptions.decode(reader, position);
            case 4: return $root.tflite.LSHProjectionOptions.decode(reader, position);
            case 5: return $root.tflite.Pool2DOptions.decode(reader, position);
            case 6: return $root.tflite.SVDFOptions.decode(reader, position);
            case 7: return $root.tflite.RNNOptions.decode(reader, position);
            case 8: return $root.tflite.FullyConnectedOptions.decode(reader, position);
            case 9: return $root.tflite.SoftmaxOptions.decode(reader, position);
            case 10: return $root.tflite.ConcatenationOptions.decode(reader, position);
            case 11: return $root.tflite.AddOptions.decode(reader, position);
            case 12: return $root.tflite.L2NormOptions.decode(reader, position);
            case 13: return $root.tflite.LocalResponseNormalizationOptions.decode(reader, position);
            case 14: return $root.tflite.LSTMOptions.decode(reader, position);
            case 15: return $root.tflite.ResizeBilinearOptions.decode(reader, position);
            case 16: return $root.tflite.CallOptions.decode(reader, position);
            case 17: return $root.tflite.ReshapeOptions.decode(reader, position);
            case 18: return $root.tflite.SkipGramOptions.decode(reader, position);
            case 19: return $root.tflite.SpaceToDepthOptions.decode(reader, position);
            case 20: return $root.tflite.EmbeddingLookupSparseOptions.decode(reader, position);
            case 21: return $root.tflite.MulOptions.decode(reader, position);
            case 22: return $root.tflite.PadOptions.decode(reader, position);
            case 23: return $root.tflite.GatherOptions.decode(reader, position);
            case 24: return $root.tflite.BatchToSpaceNDOptions.decode(reader, position);
            case 25: return $root.tflite.SpaceToBatchNDOptions.decode(reader, position);
            case 26: return $root.tflite.TransposeOptions.decode(reader, position);
            case 27: return $root.tflite.ReducerOptions.decode(reader, position);
            case 28: return $root.tflite.SubOptions.decode(reader, position);
            case 29: return $root.tflite.DivOptions.decode(reader, position);
            case 30: return $root.tflite.SqueezeOptions.decode(reader, position);
            case 31: return $root.tflite.SequenceRNNOptions.decode(reader, position);
            case 32: return $root.tflite.StridedSliceOptions.decode(reader, position);
            case 33: return $root.tflite.ExpOptions.decode(reader, position);
            case 34: return $root.tflite.TopKV2Options.decode(reader, position);
            case 35: return $root.tflite.SplitOptions.decode(reader, position);
            case 36: return $root.tflite.LogSoftmaxOptions.decode(reader, position);
            case 37: return $root.tflite.CastOptions.decode(reader, position);
            case 38: return $root.tflite.DequantizeOptions.decode(reader, position);
            case 39: return $root.tflite.MaximumMinimumOptions.decode(reader, position);
            case 40: return $root.tflite.ArgMaxOptions.decode(reader, position);
            case 41: return $root.tflite.LessOptions.decode(reader, position);
            case 42: return $root.tflite.NegOptions.decode(reader, position);
            case 43: return $root.tflite.PadV2Options.decode(reader, position);
            case 44: return $root.tflite.GreaterOptions.decode(reader, position);
            case 45: return $root.tflite.GreaterEqualOptions.decode(reader, position);
            case 46: return $root.tflite.LessEqualOptions.decode(reader, position);
            case 47: return $root.tflite.SelectOptions.decode(reader, position);
            case 48: return $root.tflite.SliceOptions.decode(reader, position);
            case 49: return $root.tflite.TransposeConvOptions.decode(reader, position);
            case 50: return $root.tflite.SparseToDenseOptions.decode(reader, position);
            case 51: return $root.tflite.TileOptions.decode(reader, position);
            case 52: return $root.tflite.ExpandDimsOptions.decode(reader, position);
            case 53: return $root.tflite.EqualOptions.decode(reader, position);
            case 54: return $root.tflite.NotEqualOptions.decode(reader, position);
            case 55: return $root.tflite.ShapeOptions.decode(reader, position);
            case 56: return $root.tflite.PowOptions.decode(reader, position);
            case 57: return $root.tflite.ArgMinOptions.decode(reader, position);
            case 58: return $root.tflite.FakeQuantOptions.decode(reader, position);
            case 59: return $root.tflite.PackOptions.decode(reader, position);
            case 60: return $root.tflite.LogicalOrOptions.decode(reader, position);
            case 61: return $root.tflite.OneHotOptions.decode(reader, position);
            case 62: return $root.tflite.LogicalAndOptions.decode(reader, position);
            case 63: return $root.tflite.LogicalNotOptions.decode(reader, position);
            case 64: return $root.tflite.UnpackOptions.decode(reader, position);
            case 65: return $root.tflite.FloorDivOptions.decode(reader, position);
            case 66: return $root.tflite.SquareOptions.decode(reader, position);
            case 67: return $root.tflite.ZerosLikeOptions.decode(reader, position);
            case 68: return $root.tflite.FillOptions.decode(reader, position);
            case 69: return $root.tflite.BidirectionalSequenceLSTMOptions.decode(reader, position);
            case 70: return $root.tflite.BidirectionalSequenceRNNOptions.decode(reader, position);
            case 71: return $root.tflite.UnidirectionalSequenceLSTMOptions.decode(reader, position);
            case 72: return $root.tflite.FloorModOptions.decode(reader, position);
            case 73: return $root.tflite.RangeOptions.decode(reader, position);
            case 74: return $root.tflite.ResizeNearestNeighborOptions.decode(reader, position);
            case 75: return $root.tflite.LeakyReluOptions.decode(reader, position);
            case 76: return $root.tflite.SquaredDifferenceOptions.decode(reader, position);
            case 77: return $root.tflite.MirrorPadOptions.decode(reader, position);
            case 78: return $root.tflite.AbsOptions.decode(reader, position);
            case 79: return $root.tflite.SplitVOptions.decode(reader, position);
            case 80: return $root.tflite.UniqueOptions.decode(reader, position);
            case 81: return $root.tflite.ReverseV2Options.decode(reader, position);
            case 82: return $root.tflite.AddNOptions.decode(reader, position);
            case 83: return $root.tflite.GatherNdOptions.decode(reader, position);
            case 84: return $root.tflite.CosOptions.decode(reader, position);
            case 85: return $root.tflite.WhereOptions.decode(reader, position);
            case 86: return $root.tflite.RankOptions.decode(reader, position);
            case 87: return $root.tflite.ReverseSequenceOptions.decode(reader, position);
            case 88: return $root.tflite.MatrixDiagOptions.decode(reader, position);
            case 89: return $root.tflite.QuantizeOptions.decode(reader, position);
            case 90: return $root.tflite.MatrixSetDiagOptions.decode(reader, position);
            case 91: return $root.tflite.HardSwishOptions.decode(reader, position);
            case 92: return $root.tflite.IfOptions.decode(reader, position);
            case 93: return $root.tflite.WhileOptions.decode(reader, position);
            case 94: return $root.tflite.DepthToSpaceOptions.decode(reader, position);
            case 95: return $root.tflite.NonMaxSuppressionV4Options.decode(reader, position);
            case 96: return $root.tflite.NonMaxSuppressionV5Options.decode(reader, position);
            case 97: return $root.tflite.ScatterNdOptions.decode(reader, position);
            case 98: return $root.tflite.SelectV2Options.decode(reader, position);
            case 99: return $root.tflite.DensifyOptions.decode(reader, position);
            case 100: return $root.tflite.SegmentSumOptions.decode(reader, position);
            case 101: return $root.tflite.BatchMatMulOptions.decode(reader, position);
        }
        return undefined;
    }
};

$root.tflite.Padding = {
    SAME: 0,
    VALID: 1
};

$root.tflite.ActivationFunctionType = {
    NONE: 0,
    RELU: 1,
    RELU_N1_TO_1: 2,
    RELU6: 3,
    TANH: 4,
    SIGN_BIT: 5
};

$root.tflite.Conv2DOptions = class Conv2DOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.Conv2DOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.padding = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.stride_w = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.stride_h = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.dilation_w_factor = offset ? reader.int32(position + offset) : 1;
        offset = reader.offset(position, 14);
        $.dilation_h_factor = offset ? reader.int32(position + offset) : 1;
        return $;
    }
};

$root.tflite.Pool2DOptions = class Pool2DOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.Pool2DOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.padding = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.stride_w = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.stride_h = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.filter_width = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.filter_height = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 14);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.DepthwiseConv2DOptions = class DepthwiseConv2DOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.DepthwiseConv2DOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.padding = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.stride_w = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.stride_h = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.depth_multiplier = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 14);
        $.dilation_w_factor = offset ? reader.int32(position + offset) : 1;
        offset = reader.offset(position, 16);
        $.dilation_h_factor = offset ? reader.int32(position + offset) : 1;
        return $;
    }
};

$root.tflite.ConcatEmbeddingsOptions = class ConcatEmbeddingsOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ConcatEmbeddingsOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.num_channels = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.num_columns_per_channel = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 8);
        $.embedding_dim_per_channel = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.LSHProjectionType = {
    UNKNOWN: 0,
    SPARSE: 1,
    DENSE: 2
};

$root.tflite.LSHProjectionOptions = class LSHProjectionOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LSHProjectionOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.SVDFOptions = class SVDFOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SVDFOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.rank = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.RNNOptions = class RNNOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.RNNOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.SequenceRNNOptions = class SequenceRNNOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SequenceRNNOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.time_major = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 6);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.BidirectionalSequenceRNNOptions = class BidirectionalSequenceRNNOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.BidirectionalSequenceRNNOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.time_major = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 6);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.merge_outputs = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 10);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.FullyConnectedOptionsWeightsFormat = {
    DEFAULT: 0,
    SHUFFLED4x16INT8: 1
};

$root.tflite.FullyConnectedOptions = class FullyConnectedOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.FullyConnectedOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.weights_format = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.keep_num_dims = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 10);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.SoftmaxOptions = class SoftmaxOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SoftmaxOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.beta = offset ? reader.float32(position + offset) : 0;
        return $;
    }
};

$root.tflite.ConcatenationOptions = class ConcatenationOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ConcatenationOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.axis = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.AddOptions = class AddOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.AddOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.MulOptions = class MulOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.MulOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.L2NormOptions = class L2NormOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.L2NormOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.LocalResponseNormalizationOptions = class LocalResponseNormalizationOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LocalResponseNormalizationOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.radius = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.bias = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.alpha = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.beta = offset ? reader.float32(position + offset) : 0;
        return $;
    }
};

$root.tflite.LSTMKernelType = {
    FULL: 0,
    BASIC: 1
};

$root.tflite.LSTMOptions = class LSTMOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LSTMOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.cell_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.proj_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.kernel_type = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.UnidirectionalSequenceLSTMOptions = class UnidirectionalSequenceLSTMOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.UnidirectionalSequenceLSTMOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.cell_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.proj_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.time_major = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 12);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.BidirectionalSequenceLSTMOptions = class BidirectionalSequenceLSTMOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.BidirectionalSequenceLSTMOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.cell_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.proj_clip = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.merge_outputs = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 12);
        $.time_major = offset ? reader.bool(position + offset) : true;
        offset = reader.offset(position, 14);
        $.asymmetric_quantize_inputs = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.ResizeBilinearOptions = class ResizeBilinearOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ResizeBilinearOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.new_height = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.new_width = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.align_corners = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 10);
        $.half_pixel_centers = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.ResizeNearestNeighborOptions = class ResizeNearestNeighborOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ResizeNearestNeighborOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.align_corners = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 6);
        $.half_pixel_centers = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.CallOptions = class CallOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.CallOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.subgraph = offset ? reader.uint32(position + offset) : 0;
        return $;
    }
};

$root.tflite.PadOptions = class PadOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.PadOptions();
        let offset;
        return $;
    }
};

$root.tflite.PadV2Options = class PadV2Options {

    static decode(reader, position) {
        const $ = new $root.tflite.PadV2Options();
        let offset;
        return $;
    }
};

$root.tflite.ReshapeOptions = class ReshapeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ReshapeOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.new_shape = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.SpaceToBatchNDOptions = class SpaceToBatchNDOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SpaceToBatchNDOptions();
        let offset;
        return $;
    }
};

$root.tflite.BatchToSpaceNDOptions = class BatchToSpaceNDOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.BatchToSpaceNDOptions();
        let offset;
        return $;
    }
};

$root.tflite.SkipGramOptions = class SkipGramOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SkipGramOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.ngram_size = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.max_skip_size = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.include_all_ngrams = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.SpaceToDepthOptions = class SpaceToDepthOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SpaceToDepthOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.block_size = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.DepthToSpaceOptions = class DepthToSpaceOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.DepthToSpaceOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.block_size = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.SubOptions = class SubOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SubOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.DivOptions = class DivOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.DivOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.fused_activation_function = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.TopKV2Options = class TopKV2Options {

    static decode(reader, position) {
        const $ = new $root.tflite.TopKV2Options();
        let offset;
        return $;
    }
};

$root.tflite.CombinerType = {
    SUM: 0,
    MEAN: 1,
    SQRTN: 2
};

$root.tflite.EmbeddingLookupSparseOptions = class EmbeddingLookupSparseOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.EmbeddingLookupSparseOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.combiner = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.GatherOptions = class GatherOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.GatherOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.axis = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.TransposeOptions = class TransposeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.TransposeOptions();
        let offset;
        return $;
    }
};

$root.tflite.ExpOptions = class ExpOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ExpOptions();
        let offset;
        return $;
    }
};

$root.tflite.CosOptions = class CosOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.CosOptions();
        let offset;
        return $;
    }
};

$root.tflite.ReducerOptions = class ReducerOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ReducerOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.keep_dims = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.SqueezeOptions = class SqueezeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SqueezeOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.squeeze_dims = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.SplitOptions = class SplitOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SplitOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.num_splits = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.SplitVOptions = class SplitVOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SplitVOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.num_splits = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.StridedSliceOptions = class StridedSliceOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.StridedSliceOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.begin_mask = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.end_mask = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.ellipsis_mask = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.new_axis_mask = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.shrink_axis_mask = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.LogSoftmaxOptions = class LogSoftmaxOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LogSoftmaxOptions();
        let offset;
        return $;
    }
};

$root.tflite.CastOptions = class CastOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.CastOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.in_data_type = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.out_data_type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.DequantizeOptions = class DequantizeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.DequantizeOptions();
        let offset;
        return $;
    }
};

$root.tflite.MaximumMinimumOptions = class MaximumMinimumOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.MaximumMinimumOptions();
        let offset;
        return $;
    }
};

$root.tflite.TileOptions = class TileOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.TileOptions();
        let offset;
        return $;
    }
};

$root.tflite.ArgMaxOptions = class ArgMaxOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ArgMaxOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.output_type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.ArgMinOptions = class ArgMinOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ArgMinOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.output_type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.GreaterOptions = class GreaterOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.GreaterOptions();
        let offset;
        return $;
    }
};

$root.tflite.GreaterEqualOptions = class GreaterEqualOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.GreaterEqualOptions();
        let offset;
        return $;
    }
};

$root.tflite.LessOptions = class LessOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LessOptions();
        let offset;
        return $;
    }
};

$root.tflite.LessEqualOptions = class LessEqualOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LessEqualOptions();
        let offset;
        return $;
    }
};

$root.tflite.NegOptions = class NegOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.NegOptions();
        let offset;
        return $;
    }
};

$root.tflite.SelectOptions = class SelectOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SelectOptions();
        let offset;
        return $;
    }
};

$root.tflite.SliceOptions = class SliceOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SliceOptions();
        let offset;
        return $;
    }
};

$root.tflite.TransposeConvOptions = class TransposeConvOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.TransposeConvOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.padding = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.stride_w = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.stride_h = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.ExpandDimsOptions = class ExpandDimsOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ExpandDimsOptions();
        let offset;
        return $;
    }
};

$root.tflite.SparseToDenseOptions = class SparseToDenseOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SparseToDenseOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.validate_indices = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.EqualOptions = class EqualOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.EqualOptions();
        let offset;
        return $;
    }
};

$root.tflite.NotEqualOptions = class NotEqualOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.NotEqualOptions();
        let offset;
        return $;
    }
};

$root.tflite.ShapeOptions = class ShapeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ShapeOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.out_type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.RankOptions = class RankOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.RankOptions();
        let offset;
        return $;
    }
};

$root.tflite.PowOptions = class PowOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.PowOptions();
        let offset;
        return $;
    }
};

$root.tflite.FakeQuantOptions = class FakeQuantOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.FakeQuantOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.min = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.max = offset ? reader.float32(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.num_bits = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.narrow_range = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.PackOptions = class PackOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.PackOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.values_count = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.axis = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.LogicalOrOptions = class LogicalOrOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LogicalOrOptions();
        let offset;
        return $;
    }
};

$root.tflite.OneHotOptions = class OneHotOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.OneHotOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.axis = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.AbsOptions = class AbsOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.AbsOptions();
        let offset;
        return $;
    }
};

$root.tflite.HardSwishOptions = class HardSwishOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.HardSwishOptions();
        let offset;
        return $;
    }
};

$root.tflite.LogicalAndOptions = class LogicalAndOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LogicalAndOptions();
        let offset;
        return $;
    }
};

$root.tflite.LogicalNotOptions = class LogicalNotOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LogicalNotOptions();
        let offset;
        return $;
    }
};

$root.tflite.UnpackOptions = class UnpackOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.UnpackOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.num = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.axis = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.FloorDivOptions = class FloorDivOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.FloorDivOptions();
        let offset;
        return $;
    }
};

$root.tflite.SquareOptions = class SquareOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SquareOptions();
        let offset;
        return $;
    }
};

$root.tflite.ZerosLikeOptions = class ZerosLikeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ZerosLikeOptions();
        let offset;
        return $;
    }
};

$root.tflite.FillOptions = class FillOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.FillOptions();
        let offset;
        return $;
    }
};

$root.tflite.FloorModOptions = class FloorModOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.FloorModOptions();
        let offset;
        return $;
    }
};

$root.tflite.RangeOptions = class RangeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.RangeOptions();
        let offset;
        return $;
    }
};

$root.tflite.LeakyReluOptions = class LeakyReluOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.LeakyReluOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.alpha = offset ? reader.float32(position + offset) : 0;
        return $;
    }
};

$root.tflite.SquaredDifferenceOptions = class SquaredDifferenceOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SquaredDifferenceOptions();
        let offset;
        return $;
    }
};

$root.tflite.MirrorPadMode = {
    REFLECT: 0,
    SYMMETRIC: 1
};

$root.tflite.MirrorPadOptions = class MirrorPadOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.MirrorPadOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.mode = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.UniqueOptions = class UniqueOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.UniqueOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.idx_out_type = offset ? reader.int8(position + offset) : 2;
        return $;
    }
};

$root.tflite.ReverseV2Options = class ReverseV2Options {

    static decode(reader, position) {
        const $ = new $root.tflite.ReverseV2Options();
        let offset;
        return $;
    }
};

$root.tflite.AddNOptions = class AddNOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.AddNOptions();
        let offset;
        return $;
    }
};

$root.tflite.GatherNdOptions = class GatherNdOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.GatherNdOptions();
        let offset;
        return $;
    }
};

$root.tflite.WhereOptions = class WhereOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.WhereOptions();
        let offset;
        return $;
    }
};

$root.tflite.ReverseSequenceOptions = class ReverseSequenceOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ReverseSequenceOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.seq_dim = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.batch_dim = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.MatrixDiagOptions = class MatrixDiagOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.MatrixDiagOptions();
        let offset;
        return $;
    }
};

$root.tflite.QuantizeOptions = class QuantizeOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.QuantizeOptions();
        let offset;
        return $;
    }
};

$root.tflite.MatrixSetDiagOptions = class MatrixSetDiagOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.MatrixSetDiagOptions();
        let offset;
        return $;
    }
};

$root.tflite.IfOptions = class IfOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.IfOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.then_subgraph_index = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.else_subgraph_index = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.WhileOptions = class WhileOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.WhileOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.cond_subgraph_index = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.body_subgraph_index = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.NonMaxSuppressionV4Options = class NonMaxSuppressionV4Options {

    static decode(reader, position) {
        const $ = new $root.tflite.NonMaxSuppressionV4Options();
        let offset;
        return $;
    }
};

$root.tflite.NonMaxSuppressionV5Options = class NonMaxSuppressionV5Options {

    static decode(reader, position) {
        const $ = new $root.tflite.NonMaxSuppressionV5Options();
        let offset;
        return $;
    }
};

$root.tflite.ScatterNdOptions = class ScatterNdOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ScatterNdOptions();
        let offset;
        return $;
    }
};

$root.tflite.SelectV2Options = class SelectV2Options {

    static decode(reader, position) {
        const $ = new $root.tflite.SelectV2Options();
        let offset;
        return $;
    }
};

$root.tflite.DensifyOptions = class DensifyOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.DensifyOptions();
        let offset;
        return $;
    }
};

$root.tflite.SegmentSumOptions = class SegmentSumOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SegmentSumOptions();
        let offset;
        return $;
    }
};

$root.tflite.BatchMatMulOptions = class BatchMatMulOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.BatchMatMulOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.adj_x = offset ? reader.bool(position + offset) : false;
        offset = reader.offset(position, 6);
        $.adj_y = offset ? reader.bool(position + offset) : false;
        return $;
    }
};

$root.tflite.OperatorCode = class OperatorCode {

    static decode(reader, position) {
        const $ = new $root.tflite.OperatorCode();
        let offset;
        offset = reader.offset(position, 4);
        $.builtin_code = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.custom_code = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 8);
        $.version = offset ? reader.int32(position + offset) : 1;
        return $;
    }
};

$root.tflite.CustomOptionsFormat = {
    FLEXBUFFERS: 0
};

$root.tflite.Operator = class Operator {

    static decode(reader, position) {
        const $ = new $root.tflite.Operator();
        let offset;
        offset = reader.offset(position, 4);
        $.opcode_index = offset ? reader.uint32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.inputs = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 8);
        $.outputs = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 10);
        const $type$builtin_options= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 12);
        $.builtin_options = offset ? $root.tflite.BuiltinOptions.decode(reader, position + offset, $type$builtin_options) : null;
        offset = reader.offset(position, 14);
        $.custom_options = offset ? new Uint8Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 16);
        $.custom_options_format = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 18);
        // TODO [bool]
        $.mutating_variable_inputs= undefined;
        offset = reader.offset(position, 20);
        $.intermediates = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.SubGraph = class SubGraph {

    static decode(reader, position) {
        const $ = new $root.tflite.SubGraph();
        let offset;
        offset = reader.offset(position, 4);
        $.tensors = reader.array(offset, position, $root.tflite.Tensor.decode);
        offset = reader.offset(position, 6);
        $.inputs = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 8);
        $.outputs = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 10);
        $.operators = reader.array(offset, position, $root.tflite.Operator.decode);
        offset = reader.offset(position, 12);
        $.name = offset ? reader.string(position + offset) : null;
        return $;
    }
};

$root.tflite.Buffer = class Buffer {

    static decode(reader, position) {
        const $ = new $root.tflite.Buffer();
        let offset;
        offset = reader.offset(position, 4);
        $.data = offset ? new Uint8Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.Metadata = class Metadata {

    static decode(reader, position) {
        const $ = new $root.tflite.Metadata();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        $.buffer = offset ? reader.uint32(position + offset) : 0;
        return $;
    }
};

$root.tflite.Model = class Model {

    static create(reader) {
        return $root.tflite.Model.decode(reader, reader.int32(reader.position) + reader.position);
    }

    static identifier(reader) {
        return reader.identifier('TFL3');
    }

    static decode(reader, position) {
        const $ = new $root.tflite.Model();
        let offset;
        offset = reader.offset(position, 4);
        $.version = offset ? reader.uint32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.operator_codes = reader.array(offset, position, $root.tflite.OperatorCode.decode);
        offset = reader.offset(position, 8);
        $.subgraphs = reader.array(offset, position, $root.tflite.SubGraph.decode);
        offset = reader.offset(position, 10);
        $.description = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 12);
        $.buffers = reader.array(offset, position, $root.tflite.Buffer.decode);
        offset = reader.offset(position, 14);
        $.metadata_buffer = offset ? new Int32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 16);
        $.metadata = reader.array(offset, position, $root.tflite.Metadata.decode);
        return $;
    }
};


$root.tflite = $root.tflite || {};

$root.tflite.AssociatedFileType = {
    UNKNOWN: 0,
    DESCRIPTIONS: 1,
    TENSOR_AXIS_LABELS: 2,
    TENSOR_VALUE_LABELS: 3,
    TENSOR_AXIS_SCORE_CALIBRATION: 4,
    VOCABULARY: 5
};

$root.tflite.AssociatedFile = class AssociatedFile {

    static decode(reader, position) {
        const $ = new $root.tflite.AssociatedFile();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        $.description = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 8);
        $.type = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 10);
        $.locale = offset ? reader.string(position + offset) : null;
        return $;
    }
};

$root.tflite.FeatureProperties = class FeatureProperties {

    static decode(reader, position) {
        const $ = new $root.tflite.FeatureProperties();
        let offset;
        return $;
    }
};

$root.tflite.ColorSpaceType = {
    UNKNOWN: 0,
    RGB: 1,
    GRAYSCALE: 2
};

$root.tflite.ImageSize = class ImageSize {

    static decode(reader, position) {
        const $ = new $root.tflite.ImageSize();
        let offset;
        offset = reader.offset(position, 4);
        $.width = offset ? reader.uint32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.height = offset ? reader.uint32(position + offset) : 0;
        return $;
    }
};

$root.tflite.ImageProperties = class ImageProperties {

    static decode(reader, position) {
        const $ = new $root.tflite.ImageProperties();
        let offset;
        offset = reader.offset(position, 4);
        $.color_space = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        // TODO Table
        $.default_size= undefined;
        return $;
    }
};

$root.tflite.BoundingBoxType = {
    UNKNOWN: 0,
    BOUNDARIES: 1,
    UPPER_LEFT: 2,
    CENTER: 3
};

$root.tflite.CoordinateType = {
    RATIO: 0,
    PIXEL: 1
};

$root.tflite.BoundingBoxProperties = class BoundingBoxProperties {

    static decode(reader, position) {
        const $ = new $root.tflite.BoundingBoxProperties();
        let offset;
        offset = reader.offset(position, 4);
        $.index = offset ? new Uint32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.type = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 8);
        $.coordinate_type = offset ? reader.int8(position + offset) : 0;
        return $;
    }
};

$root.tflite.ContentProperties = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.tflite.FeatureProperties.decode(reader, position);
            case 2: return $root.tflite.ImageProperties.decode(reader, position);
            case 3: return $root.tflite.BoundingBoxProperties.decode(reader, position);
        }
        return undefined;
    }
};

$root.tflite.ValueRange = class ValueRange {

    static decode(reader, position) {
        const $ = new $root.tflite.ValueRange();
        let offset;
        offset = reader.offset(position, 4);
        $.min = offset ? reader.int32(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.max = offset ? reader.int32(position + offset) : 0;
        return $;
    }
};

$root.tflite.Content = class Content {

    static decode(reader, position) {
        const $ = new $root.tflite.Content();
        let offset;
        offset = reader.offset(position, 4);
        const $type$content_properties= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.content_properties = offset ? $root.tflite.ContentProperties.decode(reader, position + offset, $type$content_properties) : null;
        offset = reader.offset(position, 8);
        // TODO Table
        $.range= undefined;
        return $;
    }
};

$root.tflite.NormalizationOptions = class NormalizationOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.NormalizationOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.mean = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.std = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.ScoreTransformationType = {
    IDENTITY: 0,
    LOG: 1,
    INVERSE_LOGISTIC: 2
};

$root.tflite.ScoreCalibrationOptions = class ScoreCalibrationOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ScoreCalibrationOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.score_transformation = offset ? reader.int8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.default_score = offset ? reader.float32(position + offset) : 0;
        return $;
    }
};

$root.tflite.ScoreThresholdingOptions = class ScoreThresholdingOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.ScoreThresholdingOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.global_score_threshold = offset ? reader.float32(position + offset) : 0;
        return $;
    }
};

$root.tflite.BertTokenizerOptions = class BertTokenizerOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.BertTokenizerOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.vocab_file = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        return $;
    }
};

$root.tflite.SentencePieceTokenizerOptions = class SentencePieceTokenizerOptions {

    static decode(reader, position) {
        const $ = new $root.tflite.SentencePieceTokenizerOptions();
        let offset;
        offset = reader.offset(position, 4);
        $.sentencePiece_model = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        offset = reader.offset(position, 6);
        $.vocab_file = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        return $;
    }
};

$root.tflite.ProcessUnitOptions = class {

    static decode(reader, position, type) {
        switch (type) {
            case 1: return $root.tflite.NormalizationOptions.decode(reader, position);
            case 2: return $root.tflite.ScoreCalibrationOptions.decode(reader, position);
            case 3: return $root.tflite.ScoreThresholdingOptions.decode(reader, position);
            case 4: return $root.tflite.BertTokenizerOptions.decode(reader, position);
            case 5: return $root.tflite.SentencePieceTokenizerOptions.decode(reader, position);
        }
        return undefined;
    }
};

$root.tflite.ProcessUnit = class ProcessUnit {

    static decode(reader, position) {
        const $ = new $root.tflite.ProcessUnit();
        let offset;
        offset = reader.offset(position, 4);
        const $type$options= offset ? reader.uint8(position + offset) : 0;
        offset = reader.offset(position, 6);
        $.options = offset ? $root.tflite.ProcessUnitOptions.decode(reader, position + offset, $type$options) : null;
        return $;
    }
};

$root.tflite.Stats = class Stats {

    static decode(reader, position) {
        const $ = new $root.tflite.Stats();
        let offset;
        offset = reader.offset(position, 4);
        $.max = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        offset = reader.offset(position, 6);
        $.min = offset ? new Float32Array(reader.buffer.buffer, reader.buffer.byteOffset + reader.vector(position + offset), reader.length(position + offset)) : null;
        return $;
    }
};

$root.tflite.TensorGroup = class TensorGroup {

    static decode(reader, position) {
        const $ = new $root.tflite.TensorGroup();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        // TODO [string]
        $.tensor_names= undefined;
        return $;
    }
};

$root.tflite.TensorMetadata = class TensorMetadata {

    static decode(reader, position) {
        const $ = new $root.tflite.TensorMetadata();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        $.description = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 8);
        // TODO [string]
        $.dimension_names= undefined;
        offset = reader.offset(position, 10);
        // TODO Table
        $.content= undefined;
        offset = reader.offset(position, 12);
        $.process_units = reader.array(offset, position, $root.tflite.ProcessUnit.decode);
        offset = reader.offset(position, 14);
        // TODO Table
        $.stats= undefined;
        offset = reader.offset(position, 16);
        $.associated_files = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        return $;
    }
};

$root.tflite.SubGraphMetadata = class SubGraphMetadata {

    static decode(reader, position) {
        const $ = new $root.tflite.SubGraphMetadata();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        $.description = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 8);
        $.input_tensor_metadata = reader.array(offset, position, $root.tflite.TensorMetadata.decode);
        offset = reader.offset(position, 10);
        $.output_tensor_metadata = reader.array(offset, position, $root.tflite.TensorMetadata.decode);
        offset = reader.offset(position, 12);
        $.associated_files = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        offset = reader.offset(position, 14);
        $.input_process_units = reader.array(offset, position, $root.tflite.ProcessUnit.decode);
        offset = reader.offset(position, 16);
        $.output_process_units = reader.array(offset, position, $root.tflite.ProcessUnit.decode);
        offset = reader.offset(position, 18);
        $.input_tensor_groups = reader.array(offset, position, $root.tflite.TensorGroup.decode);
        offset = reader.offset(position, 20);
        $.output_tensor_groups = reader.array(offset, position, $root.tflite.TensorGroup.decode);
        return $;
    }
};

$root.tflite.ModelMetadata = class ModelMetadata {

    static create(reader) {
        return $root.tflite.ModelMetadata.decode(reader, reader.int32(reader.position) + reader.position);
    }

    static identifier(reader) {
        return reader.identifier('M001');
    }

    static decode(reader, position) {
        const $ = new $root.tflite.ModelMetadata();
        let offset;
        offset = reader.offset(position, 4);
        $.name = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 6);
        $.description = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 8);
        $.version = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 10);
        $.subgraph_metadata = reader.array(offset, position, $root.tflite.SubGraphMetadata.decode);
        offset = reader.offset(position, 12);
        $.author = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 14);
        $.license = offset ? reader.string(position + offset) : null;
        offset = reader.offset(position, 16);
        $.associated_files = reader.array(offset, position, $root.tflite.AssociatedFile.decode);
        offset = reader.offset(position, 18);
        $.min_parser_version = offset ? reader.string(position + offset) : null;
        return $;
    }
};
