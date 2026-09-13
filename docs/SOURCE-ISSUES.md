# Source values to review

These are the specific omissions, conflicts and scope limits found during extraction. A dash does not always mean a source error: some properties are outside a standard's scope or use a different definition.

| Where to look | Entry | Source issue | Current site behavior |
|---|---|---|---|
| Shaft & hub depths | 4-15/16 in shaft, rectangular key, either key type | Shaft S = 4.422 in; geometric check gives about 4.419576 in. Difference is about 0.002424 in, beyond the rounding check. | Both parallel and taper combinations withheld pending an authoritative table check. |
| Metric tap drills | M64×6, M56×4, M64×4 | The source menu offers these pairs, but its drill values are NaN (missing numeric results). | “Not tabulated”; d−P estimates of 58, 52 and 60 mm remain separately labelled estimates. |
| Metric tap drills | M39×3 | Source minor-diameter minimum is 36.752 mm, greater than the listed maxima: 36.152 (5H), 36.252 (6H), 36.382 (7H). | Minimum withheld; 36 mm drill and other tabulated dimensions retained. |
| Inch bolt grades | ASTM A307 | AmesWeb lists 33 ksi proof and 36 ksi yield; the independent Bolt Depot Grade A chart marks both as unspecified. | Proof and yield withheld; 60 ksi tensile retained. |
| Inch bolt grades | ASTM A354 BC, 2-3/4–4 in source band | Yield strength cell is blank in the supplied source. | Yield shown as a dash; no inferred value. |
| Metric bolt strength | Class 9.8 above M16 | The source menu permits combinations beyond the class's diameter scope. | “Outside scope,” with no strength/load results. |

## Corrected labels and descriptions

- **1/2-inch shaft, square key:** depth page says 3/32 × 3/32; separate key-size table and JW Winco support **1/8 × 1/8**. Site uses the corroborated label. The rectangular label was blank and is supplied from the key-size table as **1/8 × 3/32**.
- **1-9/16-18 UNEF:** drill label `1-12` was inconsistent with decimal 1.5. The site uses **1-1/2**, retaining that decimal value.
- **ASTM A354 BC:** source calls it weathering steel; site uses **heat-treated alloy steel**, supported by Portland Bolt.

## Expected blanks and historical scope

- Metric classes 4.6, 4.8, 5.6, 5.8 and 6.8 do not provide the source's **0.2% nonproportional stress** field. The site does not substitute another yield-strength definition.
- Breaking torque is available only for the listed grades and small/short-fastener test scope. It is not an installation torque; larger diameters have dashes.
- Metric tap sizes absent from the source's detailed chart have no 5H/6H/7H minor limits. The site does not manufacture those limits from the drill estimate.
- A325/A490 rows reproduce historical reference values and are labelled accordingly. They are not presented as current F3125 procurement requirements.

## References

- [AmesWeb shaft/hub depth reference](https://amesweb.info/Keys/Shaft-Keyseat-Hub-Keyway-Depth-Values.aspx)
- [AmesWeb metric tap-drill reference](https://amesweb.info/Screws/metric-tap-drill-chart.aspx)
- [AmesWeb inch bolt grades](https://amesweb.info/Screws/bolt-grades-strength-markings.aspx)
- [JW Winco key dimensions](https://www.jwwinco.mx/fileadmin/user_upload_jwwinco/6885-1_01.pdf)
- [Bolt Depot grade chart](https://boltdepot.com/fastener-information/Materials-and-Grades/Bolt-Grade-Chart)
- [Bossard property-class scope](https://media.bossard.com/ro-en/-/media/bossard-group/website/documents/technical-resources/en/f-004-en.pdf)
- [Portland Bolt strength chart](https://www.portlandbolt.com/technical/strength-requirements-by-grade/)
