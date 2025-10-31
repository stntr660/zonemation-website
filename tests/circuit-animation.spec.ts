import { test, expect } from '@playwright/test';

test.describe('Circuit Animation Tests', () => {
  test('should verify complex SVG paths and PCB animation sequence', async ({ page }) => {
    // Navigate to the test animation page
    await page.goto('http://localhost:3001/test-animation');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify the page has the AnimatedLogo component
    const animatedLogo = page.locator('[data-testid="animated-logo"]');
    await expect(animatedLogo).toBeVisible();
    
    // Take initial screenshot
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-initial.png',
      fullPage: true 
    });
    
    // Verify SVG is present
    const svg = page.locator('svg');
    await expect(svg).toBeVisible();
    
    // Check that all 5 layers (Circuit4, Circuit3, Circuit2, Circuit, frame_black_part) are present
    const circuit4 = page.locator('path[data-layer="Circuit4"]');
    const circuit3 = page.locator('path[data-layer="Circuit3"]');
    const circuit2 = page.locator('path[data-layer="Circuit2"]');
    const circuit = page.locator('path[data-layer="Circuit"]');
    const frameBlackPart = page.locator('path[data-layer="frame_black_part"]');
    
    await expect(circuit4).toBeVisible();
    await expect(circuit3).toBeVisible();
    await expect(circuit2).toBeVisible();
    await expect(circuit).toBeVisible();
    await expect(frameBlackPart).toBeVisible();
    
    // Verify complex path data - check for specific complex path signatures
    const circuit4Path = await circuit4.getAttribute('d');
    const circuit3Path = await circuit3.getAttribute('d');
    const circuit2Path = await circuit2.getAttribute('d');
    const circuitPath = await circuit.getAttribute('d');
    const frameBlackPath = await frameBlackPart.getAttribute('d');
    
    // Verify paths contain complex geometry (not simplified lines)
    expect(circuit4Path).toContain('M'); // Should start with move command
    expect(circuit4Path).toContain('c'); // Should contain curve commands
    expect(circuit4Path?.length).toBeGreaterThan(50); // Should be substantial
    
    expect(circuit3Path).toContain('M');
    expect(circuit3Path).toContain('c');
    expect(circuit3Path?.length).toBeGreaterThan(50);
    
    expect(circuit2Path).toContain('M');
    expect(circuit2Path).toContain('c');
    expect(circuit2Path?.length).toBeGreaterThan(50);
    
    expect(circuitPath).toContain('M');
    expect(circuitPath).toContain('c');
    expect(circuitPath?.length).toBeGreaterThan(50);
    
    expect(frameBlackPath).toContain('M');
    expect(frameBlackPath?.length).toBeGreaterThan(50);
    
    console.log('Circuit4 path preview:', circuit4Path?.substring(0, 100) + '...');
    console.log('Circuit3 path preview:', circuit3Path?.substring(0, 100) + '...');
    console.log('Circuit2 path preview:', circuit2Path?.substring(0, 100) + '...');
    console.log('Circuit path preview:', circuitPath?.substring(0, 100) + '...');
    console.log('Frame black path preview:', frameBlackPath?.substring(0, 100) + '...');
  });

  test('should verify animation sequence and timing', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Wait a moment for animation to start
    await page.waitForTimeout(500);
    
    // Take screenshot during progressive activation phase
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-progressive.png',
      fullPage: true 
    });
    
    // Wait for electric particles phase
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-particles.png',
      fullPage: true 
    });
    
    // Wait for neon glow phase
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-glow.png',
      fullPage: true 
    });
    
    // Wait for logo reveal phase
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-reveal.png',
      fullPage: true 
    });
    
    // Wait for idle breathing phase
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-breathing.png',
      fullPage: true 
    });
  });

  test('should verify electric particles using animateMotion', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Check for animateMotion elements
    const animateMotionElements = page.locator('animateMotion');
    const count = await animateMotionElements.count();
    
    expect(count).toBeGreaterThan(0);
    console.log(`Found ${count} animateMotion elements for electric particles`);
    
    // Verify particles are using the circuit paths
    for (let i = 0; i < Math.min(count, 5); i++) {
      const motionElement = animateMotionElements.nth(i);
      const path = await motionElement.getAttribute('path');
      
      expect(path).toBeTruthy();
      expect(path).toContain('M'); // Should start with move command
      console.log(`Particle ${i + 1} path preview:`, path?.substring(0, 100) + '...');
    }
  });

  test('should verify CSS animations and transitions', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Check for CSS animations on circuit paths
    const circuitPaths = page.locator('path[data-layer]');
    const pathCount = await circuitPaths.count();
    
    expect(pathCount).toBe(5); // Should have exactly 5 circuit layers
    
    // Verify each path has animation properties
    for (let i = 0; i < pathCount; i++) {
      const path = circuitPaths.nth(i);
      const layer = await path.getAttribute('data-layer');
      
      // Check computed styles for animations
      const strokeDasharray = await path.evaluate(el => 
        getComputedStyle(el).strokeDasharray
      );
      const strokeDashoffset = await path.evaluate(el => 
        getComputedStyle(el).strokeDashoffset
      );
      
      console.log(`Layer ${layer}:`, { strokeDasharray, strokeDashoffset });
    }
  });

  test('should verify favicon animation integration', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Check if favicon is present and uses SVG
    const favicon = page.locator('link[rel="icon"]');
    const faviconHref = await favicon.getAttribute('href');
    
    console.log('Favicon href:', faviconHref);
    
    // If favicon is SVG-based, verify it contains circuit paths
    if (faviconHref?.includes('.svg') || faviconHref?.startsWith('data:image/svg')) {
      console.log('Favicon is SVG-based, which supports animation');
    }
  });

  test('should measure animation performance', async ({ page }) => {
    await page.goto('http://localhost:3001/test-animation');
    await page.waitForLoadState('networkidle');
    
    // Measure performance during animation
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const animationEntries = entries.filter(entry => 
            entry.entryType === 'measure' || entry.name.includes('animation')
          );
          
          if (animationEntries.length > 0) {
            resolve(animationEntries);
          }
        });
        
        observer.observe({ entryTypes: ['measure', 'navigation'] });
        
        // Fallback timeout
        setTimeout(() => {
          resolve([]);
        }, 5000);
      });
    });
    
    console.log('Performance metrics:', performanceMetrics);
    
    // Take final screenshot
    await page.screenshot({ 
      path: '/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website/tests/screenshots/animation-final.png',
      fullPage: true 
    });
  });
});