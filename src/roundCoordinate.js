import { GRID_SIZE } from "./constants"

export default function roundCoordinate(x) {
    return Math.round(x / GRID_SIZE) * GRID_SIZE
}
