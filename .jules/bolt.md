## 2026-07-15 - Extract Sub-components
**Learning:** Defining sub-components inside a parent component's render loop causes unnecessary DOM teardown and recreations on every render, negatively impacting performance.
**Action:** Extract sub-components to the module scope and wrap them with `React.memo()` when applicable to prevent unnecessary re-renders. Pass necessary states as explicit props.
