# Shaft and hub depth data

Retrieved 2026-09-13 from [AmesWeb](https://amesweb.info/Keys/Shaft-Keyseat-Hub-Keyway-Depth-Values.aspx). All 88 nominal shaft selections × 2 cross-sections × 2 key types were queried. The app uses local data; no requests are made to AmesWeb at runtime. 350 combinations are available, two quarantined. Values are nominal, not a complete manufacturing tolerance specification.

## Validation and corrections

Five square/parallel entries were compared with the [JW Winco WN 6885 inch reference](https://www.jwwinco.mx/fileadmin/user_upload_jwwinco/6885-1_01.pdf):

| Shaft in | S in | T in |
|---|---|---|
| 1/2 | 0.430 | 0.560 |
| 5/8 | 0.517 | 0.709 |
| 3/4 | 0.644 | 0.837 |
| 7/8 | 0.771 | 0.964 |
| 1 | 0.859 | 1.114 |

The manufacturer table gives separate tolerances; those are not imported as universal tolerances for this calculator.

The source depth page mislabels the 1/2-inch square key as 3/32 × 3/32 and leaves its rectangular key label blank. Key labels are obtained consistently from the already extracted key-size schedule: 1/8 × 1/8 square, 1/8 × 3/32 rectangular. The manufacturer's 1/2-inch square entry independently confirms 1/8 × 1/8. Rectangular depth values agree with that geometry.

Geometric consistency check, all lengths in inches: y = (D − sqrt(D² − W²))/2; S = D − y − H/2; T = D − y + H/2 + C, with C = 0.005 for parallel and −0.020 for taper. This check is not used to replace the table values or synthesize unlisted diameters. Available tabulated values agree within 0.0011 in (source rounding allowance).

At 4-15/16 in with a rectangular key, source S = 4.422 differs from the geometric result about 4.419576. Both parallel and taper combinations are withheld entirely with an explicit UI explanation. Source T is 5.300 parallel / 5.275 taper. Resolve against an authoritative table before enabling; do not silently replace S with the calculated value.

S is keyseat floor to opposite shaft surface. T is keyway floor to opposite bore surface, measured at the deeper end for taper keys. Original schematic diagrams show these endpoints. There is no extrapolation or interpolation, and no Calculate button.
