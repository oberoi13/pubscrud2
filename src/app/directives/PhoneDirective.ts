import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[FormatPhoneNumber]'
})
export class PhoneDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Format phone number ((000) 000-0000)
    let formattedValue = value.replace(/\D/g, ''); // Remove non-digits

    const match = formattedValue.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      formattedValue = `${match[1]} ${match[2]}-${match[3]}`;
    }

    this.el.nativeElement.value = formattedValue; // Update input value
  }

}
