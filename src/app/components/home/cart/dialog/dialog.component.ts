import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { CartService } from '../cart.service';
import { Cart } from 'src/app/models/cart.mocel';
import { Order } from 'src/app/components/admin/order/order.model';
import { OrderService } from 'src/app/components/admin/order/order.service';
import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'app-cart',
    templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
    private subscription: Subscription;
    orderMas: Order[] = [];
    name: string;
    surname: string;
    phone: number;

    orderForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required)
    })

    constructor(
        private _orderService: OrderService,
        private _cartService: CartService,
        private _dataService: DataService,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.orderMas = this._orderService.getOrders();

        this.subscription = this._orderService.orderChanged.subscribe((orders: Order[]) => {
         this.orderMas = orders; 
        })
    }

    onSubmit() {
        this.name = this.orderForm.value.name;
        this.surname = this.orderForm.value.surname;
        this.phone = +this.orderForm.value.phone;
        // this.data = {
            // dialogName: this.orderForm.value.name,
            // dialogSurname: this.orderForm.value.surname,
            // dialogTotalPrice: this._cartService.getTotalPrice()
            // dialogCartProducts: this._cartService.getCartProducts()
        // }
        // this.dialogRef.close(this.data);
        // this.name = this.data.dialogName;
        // console.log(this.dialogRef);
        this.dialogRef.close();
        this.onClose();
        
    };


    convertDataToOrder(name: string, surname: string, phone: number, totalPrice: number, cartProducts: Cart[]): Order {
        const orderItem: Order = new Order(
            name,
            surname,
            phone,
            totalPrice,
            cartProducts
        );
        return orderItem;
    }


    onClose() {
        this.orderMas.push(this.convertDataToOrder(this.name, this.surname, this.phone, this._cartService.getTotalPrice() , this._cartService.getCartProducts()));
        this._orderService.setOrders(this.orderMas);
        this._dataService.storeOrder();
    }


}