export interface QuantityType {
    name: string;
    unit: string;
}

export const QT_PCS : QuantityType = {
    name: "Pieces",
    unit: "pcs"
};

export const QT_VOLUME : QuantityType = {
    name: "Volume",
    unit: "dl"
};

export const QT_WEIGHT : QuantityType = {
    name: "Weight",
    unit: "kg"
};