import { test, expect } from '@playwright/test';

test.describe('Current Animation Implementation Validation', () => {
  test('should verify what the current animation actually implements', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Test what we actually have - AnimatedLogo component structure
    const logoContainer = page.locator('svg').first();
    await expect(logoContainer).toBeVisible();
    
    // Check for the actual SVG paths in current implementation
    const logoPaths = page.locator('svg path[fill="#A7D26D"]');
    const pathCount = await logoPaths.count();
    console.log(`Found ${pathCount} logo fill paths`);
    
    // Verify the main logo paths exist
    expect(pathCount).toBeGreaterThan(0);
    
    // Check for circuit trace lines (stroke paths)
    const tracePaths = page.locator('svg path[stroke="#A7D26D"]');
    const traceCount = await tracePaths.count();
    console.log(`Found ${traceCount} circuit trace paths`);
    
    // Check for glow effects
    const glowPaths = page.locator('svg path[stroke="#ffffff"]');
    const glowCount = await glowPaths.count();
    console.log(`Found ${glowCount} glow effect paths`);
    
    // Check for spark effects (circles)
    const sparks = page.locator('svg circle[fill="#ffffff"]');
    const sparkCount = await sparks.count();
    console.log(`Found ${sparkCount} spark effects`);
    
    // Verify basic animation structure
    expect(traceCount).toBeGreaterThan(0);
    expect(sparkCount).toBeGreaterThan(0);
    
    // Take screenshot of actual implementation
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/current-implementation.png',
      fullPage: true 
    });
  });

  test('should verify missing PCB circuit features', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Check for missing features that SHOULD be there for PCB concept
    
    // 1. Look for data-layer attributes (should NOT exist in current implementation)
    const layeredPaths = page.locator('path[data-layer]');
    const layeredCount = await layeredPaths.count();
    console.log(`Layered circuit paths with data-layer attributes: ${layeredCount}`);
    expect(layeredCount).toBe(0); // Confirms they're missing
    
    // 2. Look for animateMotion elements (should NOT exist in current implementation)
    const animateMotion = page.locator('animateMotion');
    const motionCount = await animateMotion.count();
    console.log(`animateMotion elements for traveling particles: ${motionCount}`);
    expect(motionCount).toBe(0); // Confirms they're missing
    
    // 3. Check if paths contain complex geometry signatures
    const firstPath = page.locator('svg path[fill="#A7D26D"]').first();
    const pathData = await firstPath.getAttribute('d');
    console.log(`First path preview: ${pathData?.substring(0, 100)}...`);
    
    // The current paths should be complex (they are), but not the circuit board traces
    expect(pathData).toBeTruthy();
    expect(pathData?.length).toBeGreaterThan(50);
    
    // But they should NOT contain the expected circuit board path signatures
    const hasExpectedCircuitPath = pathData?.includes('M39.1,11.9c-0.2-0.4-0.9-0.2-1.4-0.2h-23c');
    expect(hasExpectedCircuitPath).toBeFalsy(); // Confirms missing circuit board paths
  });

  test('should verify animation timing and sequencing', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Restart the animation to test timing
    const restartButton = page.locator('text=Restart Animation');
    await restartButton.click();
    
    // Test animation phases with screenshots
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/phase-1-tracing.png'
    });
    
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/phase-2-progress.png'
    });
    
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/phase-3-complete.png'
    });
    
    // Verify the logo becomes visible (fill appears)
    await page.waitForTimeout(2500);
    const logoFill = page.locator('svg path[fill="#A7D26D"]').first();
    const fillOpacity = await logoFill.evaluate(el => getComputedStyle(el).opacity);
    console.log(`Logo fill opacity after animation: ${fillOpacity}`);
    
    // Should be visible after animation completes
    expect(parseFloat(fillOpacity)).toBeGreaterThan(0.5);
  });

  test('should verify favicon integration capabilities', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Check all favicon variants
    const faviconElements = page.locator('link[rel="icon"]');
    const faviconCount = await faviconElements.count();
    console.log(`Found ${faviconCount} favicon elements`);
    
    // Check each favicon
    for (let i = 0; i < faviconCount; i++) {
      const favicon = faviconElements.nth(i);
      const href = await favicon.getAttribute('href');
      const type = await favicon.getAttribute('type');
      const media = await favicon.getAttribute('media');
      
      console.log(`Favicon ${i + 1}: href=${href}, type=${type}, media=${media}`);
      
      // Verify SVG favicons exist
      if (href?.includes('.svg')) {
        expect(type).toBe('image/svg+xml');
      }
    }
    
    // Test favicon animation restart
    const faviconButton = page.locator('text=Restart Favicon Animation');
    await faviconButton.click();
    
    // Verify the button interaction works
    await page.waitForTimeout(1000);
    console.log('Favicon animation restart triggered successfully');
  });

  test('should generate comparison report', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Collect all technical details for comparison
    const technicalDetails = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      const paths = document.querySelectorAll('svg path');
      const circles = document.querySelectorAll('svg circle');
      
      return {
        svgDimensions: svg ? `${svg.getAttribute('width')}x${svg.getAttribute('height')}` : 'not found',
        viewBox: svg?.getAttribute('viewBox') || 'not found',
        totalPaths: paths.length,
        totalCircles: circles.length,
        pathDetails: Array.from(paths).map((path, i) => ({
          index: i,
          fill: path.getAttribute('fill'),
          stroke: path.getAttribute('stroke'),
          strokeWidth: path.getAttribute('strokeWidth'),
          dataLayer: path.getAttribute('data-layer'), // Should be null
          pathLength: path.getAttribute('d')?.length || 0
        })),
        circleDetails: Array.from(circles).map((circle, i) => ({
          index: i,
          cx: circle.getAttribute('cx'),
          cy: circle.getAttribute('cy'),
          r: circle.getAttribute('r'),
          fill: circle.getAttribute('fill')
        }))
      };
    });
    
    console.log('Technical Implementation Details:', JSON.stringify(technicalDetails, null, 2));
    
    // Final summary screenshot
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/technical-analysis.png',
      fullPage: true 
    });
    
    // Assertions based on current implementation
    expect(technicalDetails.totalPaths).toBeGreaterThan(5); // Has multiple paths
    expect(technicalDetails.totalCircles).toBeGreaterThan(2); // Has spark circles
    expect(technicalDetails.svgDimensions).toBeTruthy();
    
    // Verify no data-layer attributes exist (confirming missing PCB structure)
    const hasDataLayers = technicalDetails.pathDetails.some(path => path.dataLayer !== null);
    expect(hasDataLayers).toBeFalsy();
  });
});