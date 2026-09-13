# First-page validation

2026-09-13

- Node test suite: 3 tests passed. Covers all 22 interval boundaries, mixed fractions, invalid input, known dimensions and unsupported cross-sections.
- Local HTTP entrypoint: 200 OK. Browser loaded the local stylesheet, module and JSON dataset successfully.
- Browser: default 1 in input returned 1/4 × 1/4 in. Fractional 1-1/4 input remained in the correct upper-inclusive band. Rectangular selection returned 1/4 × 3/16 in. Out-of-range 31 in cleared results and displayed a validation message.
- Original desktop layout visually reviewed at 1366 × 900; compact layout reviewed in the narrow app panel. No source artwork or remote runtime assets used.
- Source engineering data has not been certified against a purchased standard. Full independent dataset verification, the remaining calculators, GitHub publication and ShopDocker container testing remain later steps.
