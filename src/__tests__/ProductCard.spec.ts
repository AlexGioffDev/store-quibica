import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../components/ProductCard.vue';
import type { Product } from '@/types';
import { createTestingPinia } from '@pinia/testing'

const productExample: Product = {
  id: 1,
  title: "Macbook Air m1",
  price: 999.99,
  description: "macbook air M1",
  category: "tecnology",
  image: "https://files.refurbed.com/ii/apple-macbook-air-m1-2020-1626677621.jpg",
  rating: {
    count: 40,
    rate: 10
  }
}


describe('Product Card', () => {
  it("render the product title, price and image corectly", () => {
    const render = mount(ProductCard, {
      props: { product: productExample },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        },
        plugins: [createTestingPinia({ createSpy: () => () => { } })]
      }
    });

    expect(render.text()).toContain(productExample.title.slice(0, 40))

    expect(render.text()).toContain('999.99')

    const img = render.find('img');
    expect(img.attributes('alt')).toBe(productExample.title)

  })
})
